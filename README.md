## Capstone-Projekt "Movie App"!
#### Mein Capstone-Projekt für den Abschluss bei der "neue-fische School and Pool for Digital Talent" ist die "Movie App". Dieses Projekt habe ich am Ende meines Kurses entwickelt und in IntelliJ IDEA als Monorepo konfiguriert.

**Backend-Technologien und Werkzeuge:**
- **Spring Initializr:** Zur Grundkonfiguration des Projekts.
- **Java (OpenJDK 21):** Als Programmiersprache.
- **Maven:** Für das Build-Management.
- **JAR:** Als Paketformat.
- **Spring Web:** Zum Erstellen von Webanwendungen.
- **Lombok:** Zur Reduzierung von Boilerplate-Code in Java.
- **Spring Reactive Web:** Für die Entwicklung reaktiver Anwendungen.
- **Spring Boot DevTools:** Zur effizienten Entwicklung und Konfiguration.

**Frontend-Technologien und Werkzeuge:**
- **Node.js-Interpreter (Version 21.3.0):** Für die Laufzeitumgebung.
- **Vite:** Zur Projektinitialisierung mittels `npx create-vite`.
- **React TypeScript Template:** Für das Vite-Projekt.
- **Axios:** Verwaltung von HTTP-Anfragen.
- **React Router Dom:** Für das Routing innerhalb der Anwendung.

**Frontend-Styling:**
- **React Bootstrap:** Für Bootstrap-Komponenten in React.
- **Font Awesome:** Zur Integration von Icons.
- **React Player:** Für die Wiedergabe von Videos.
- **MUI (Material-UI):** Für Material-Design-Komponenten.
- **Emotion:** CSS-in-JS-Styling.
- **React Material-UI Carousel:** Für Karussell-Funktionen.

**Integrationstestsmit MockMvc:**
- **JUnit 5:** Für Controller-Tests mit folgenden Konfigurationen:
  - **SpringBootTest:** Für umfassende Integrationstests.
  - **AutoConfigureMockMvc:** Ermöglicht das Testen von MVC-Controllern ohne laufenden Servlet-Container.
  - **DirtiesContext (ClassMode.BEFORE_EACH_TEST_METHOD):** Setzt den Spring-Anwendungskontext vor jeder Testmethode zurück.

**Unit-Tests mit Mockito:**
- **Mockito:** Für Service-Tests mit folgenden Konfigurationen:
  - **Mocking von Abhängigkeiten:** Für isolierte Testumgebungen.
  - **Simulation von Verhalten:** Ermöglicht das Testen der Service-Logik.
  - **Fokus auf Isolation und Effizienz:** Für schnellere und zuverlässigere Testergebnisse.

**Bereitstellung und Deployment:**
- **Docker-Containerisierung:** Für eine konsistente und isolierte Anwendungsumgebung.
- **YAML-Konfiguration:** Zur Definition der Dienste, Netzwerke und Volumen für Docker.
- **Deployment auf Render.com:** Nutzung der YAML-Konfiguration für Hosting und Management.

**Datenbankintegration:** 
- **MongoDB:** wird für die flexible Speicherung und Verwaltung unstrukturierter Daten genutzt, ideal für Projekte mit schnell wechselnden Datenanforderungen.

---

**Funktionalitäten der 'Movie App':**
- Anzeigen, Hinzufügen, Aktualisieren und Löschen von Filmen.
- Hinterlassen von Kommentaren zu Filmen und Ansehen von Trailern.
