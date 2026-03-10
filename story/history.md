# Historia Zmian Projektu (Pull Requests)

Poniżej znajduje się szczegółowe podsumowanie zmian, jakie zostały wprowadzone na stronie w poszczególnych Pull Requestach (PR), układające się w spójną historię rozwoju aplikacji:

### 1. Inicjalizacja i architektura (PR #1)
* **Start projektu**: Utworzenie bazowego projektu strony docelowej (landing page) w oparciu o Nuxt 4.
* **Integracja modułów**: Dodano niezbędne do działania strony moduły, takie jak: Nuxt Content, Nuxt Studio, Nuxt Image.
* **Funkcja kontaktu**: Wprowadzenie obsługi wysyłania formularzy kontaktowych przy pomocy pakietu Nodemailer.
* **Propozycja wizualna**: Pierwszy, wstępny wygląd strony w postaci initial commita z pierwszą architekturą.

### 2. Rozwiązanie problemów wdrożeniowych i konfiguracyjnych (PR #2)
* **Błędy budowania**: Usunięto problemy z procesem budowania (build error) poprzez rozszerzenie standardowej konfiguracji TypeScript (tsconfig).
* **Kompatybilność**: Zapewniono zgodność modułów Nuxt Content i Nuxt Studio.
* **Wdrożenie na Vercel**: Poprawiono błędy, które uniemożliwiały poprawne wdrożenie oraz uruchomienie strony na platformie Vercel.

### 3. Poprawka dla Nuxt Studio na Vercel (PR #3)
* **Naprawa błędów 404**: Skonfigurowano pole lokalizacji repozytorium dla modułu Nuxt Studio, aby zlikwidować błędy Not Found (404) środowiska podczas podglądów na platformie Vercel.

### 4. Drobne poprawki wizualne (PR #4)
* **Pozycjonowanie elementów**: Precyzyjne i odpowiednie wyrównanie znaczka (emblematu) "HANDMADE", znajdującego się w obszarze formularza kontaktowego.

### 5. Responsywność oraz udoskonalenia nawigacyjne (PR #5)
* **Responsive Web Design**: Zaimplementowano ulepszony interfejs dostosowany do urządzeń mobilnych oraz desktopowych. Dodano nową responsywną warstwę bez duplikowania elementów DOM.
* **Nawigacja**: Dodano responsywne (tzw. "przyklejone" - sticky) menu nawigacyjne dla urządzeń mobilnych.
* **Sekcja Hero**: Skorygowano wysokość początkowej sekcji strony (Hero) oraz zaktualizowano jej treść tekstową.

### 6. Poprawka Vercel Preview (PR #6)
* **Podgląd wdrożenia**: Dodano jawne (explicit) dane repozytorium do pliku `nuxt.config.ts`, w celu ułatwienia środowisku Vercel poprawnego realizowania podglądu zmian w trakcie podglądu Pull Requestów.

### 7. Modernizacja układu Desktop (PR #7)
* **Udoskonalenia Hero**: Wyśrodkowano i zmieniono pozycjonowanie opisu pod głównym tytułem (sekcja Hero) by lepiej prezentował się na ekranach desktopowych.
* **Optymalizacja Nuxt Content**: Wyciągnięto główne sekcje strony w formacie wizualnym do dedykowanych pojedynczych plików dla Nuxt Content v3.

### 8. Ikony i favicon (PR #8)
* **Rozpoznawalność strony**: Dodano ikonę w przeglądarce (favicon) w postaci wykadrowanej miniatury głównej postaci.
* Zaktualizowano pozostałe ikony aplikacji w zasobach projektu.

### 9. Customowe Logo cz. 1 (PR #9)
* **Personalizacja**: Zastąpiono wcześniej używaną ikonę Material Icon w nagłówku dedykowanym, customowym logo na transparentnym tle.

### 10. Otwartoźródłowy Nuxt Studio i modyfikacje Logo (PR #10)
* **Zmiana modułu**: Stronę zmigrowano do nowej, otwartoźródłowej wersji modułu Nuxt Studio.
* **Optymalizacja nagłówka**: Zwiększono rozmiar wdrożonego, customowego logo wewnątrz głównego paska nawigacyjnego witryny.

### 11. Refaktoryzacja Nuxt Content (PR #13)
* **Zarządzanie treścią**: Przywrócono i scentralizowano zarządzanie treścią markdowna - cały content umieszczono znów w pojedynczym pliku `index.md`.
* **Dane w formacie strukturalnym**: Zewnętrzne dane dla galerii zostały zintegrowane bezpośrednio w tym formacie.

### 12. Wektoryzacja i skalowanie Logo (PR #14)
* **Migracja z grafiki rastrowej na wektor**: Poprzednie rasterowe logo w nagłówku zamieniono na plik wektorowy SVG.
* **Integracja poprzez pakiet Nuxt Icon**: Zintegrowano nową wersję SVG we współpracy z dedykowanym modułem `@nuxt/icon`.
* **Rozmiar i estetyka**: Bardzo istotnie zwiększono rozmiar wektorowego logo, dopasowano krawędzie `viewBox` oraz zastosowano docelowy kolor motywu ("leather"). Wdrożono tym samym w pełni ostre rozwiązanie.

### 13. Poprawka poprawnego renderowania zawartości strony (PR #15)
* **Content Renderer**: Wyeliminowano problemy z końcowym generowaniem statycznych bloków i zawartości `index.md`, używając bezpośrednio domyślnego komponentu `<ContentRenderer>` do poprawnego oddania komponentów blokowych MDC na stronie głównej aplikacji.
