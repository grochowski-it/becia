import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Wszystkie pola (Imię, Email, Wiadomość) są wymagane.'
    })
  }

  // Odczyt ustawień SMTP ze środowiska
  const config = useRuntimeConfig()
  const { smtpUser, smtpClientId, smtpClientSecret, smtpRefreshToken, smtpFrom, smtpTo } = config.smtp || {}

  if (!smtpUser || !smtpClientId || !smtpClientSecret || !smtpRefreshToken) {
    console.warn('Brak pełnej konfiguracji OAuth2 dla SMTP. Wiadomość zostanie zapisana tylko w logach.')
    console.log('Nowa wiadomość z formularza:', body)
    return { success: true, message: 'Dziękuję za wiadomość! (Mock - tryb bez SMTP)' }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: smtpUser,
        clientId: smtpClientId,
        clientSecret: smtpClientSecret,
        refreshToken: smtpRefreshToken
      }
    })

    const mailOptions = {
      from: smtpFrom || smtpUser,
      to: smtpTo || smtpUser,
      subject: `Nowa wiadomość od ${body.name} z Twojego Landing Page`,
      text: `Imię: ${body.name}\nEmail: ${body.email}\nTreść:\n${body.message}`,
      html: `
        <h3>Nowa wiadomość od ${body.name}</h3>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Treść zamówienia:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `
    }

    await transporter.sendMail(mailOptions)

    return { success: true, message: 'Wiadomość została wysłana.' }
  } catch (error) {
    console.error('Błąd podczas wysyłania emaila:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Wystąpił błąd podczas wysyłania e-maila.'
    })
  }
})