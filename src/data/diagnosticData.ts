import { Category, Question } from '../types/DiagnosticTypes';

export const categories: Category[] = [
  {
    id: 'internet',
    name: 'Internetprobleme',
    description: 'Probleme mit der Internetverbindung oder Netzwerkzugriff',
    icon: 'wifi'
  },
  {
    id: 'printer',
    name: 'Druckerprobleme',
    description: 'Probleme mit Druckern und Druckaufträgen',
    icon: 'print'
  },
  {
    id: 'hardware',
    name: 'Hardwareprobleme',
    description: 'Probleme mit Computern und Peripheriegeräten',
    icon: 'computer'
  },
  {
    id: 'login',
    name: 'Loginprobleme',
    description: 'Probleme bei der Anmeldung',
    icon: 'login'
  },
  {
    id: 'software',
    name: 'Softwareprobleme',
    description: 'Probleme mit Anwendungen und Systemsoftware',
    icon: 'apps'
  },
  {
    id: 'email',
    name: 'E-Mail-Probleme',
    description: 'Probleme mit E-Mail-Zugriff und -Versand',
    icon: 'email'
  }
];

export const questions: Question[] = [
  // Internet-Probleme
  {
    id: 'internet_1',
    text: 'Betrifft das Problem nur dieses Gerät?',
    answers: [
      {
        id: 'internet_1_yes',
        text: 'Ja',
        nextQuestionId: 'internet_2'
      },
      {
        id: 'internet_1_no',
        text: 'Nein',
        nextQuestionId: 'internet_4'
      }
    ]
  },
  {
    id: 'internet_2',
    text: 'Besteht eine WLAN- oder LAN-Verbindung?',
    answers: [
      {
        id: 'internet_2_yes',
        text: 'Ja',
        nextQuestionId: 'internet_3'
      },
      {
        id: 'internet_2_no',
        text: 'Nein',
        nextQuestionId: 'internet_2_1'
      }
    ]
  },
  {
    id: 'internet_2_1',
    text: 'Wird das WLAN-Netzwerk in der Liste der verfügbaren Netzwerke angezeigt?',
    answers: [
      {
        id: 'internet_2_1_yes',
        text: 'Ja',
        action: 'WLAN-Treiber und Netzwerkadapter prüfen, ggf. neu installieren'
      },
      {
        id: 'internet_2_1_no',
        text: 'Nein',
        action: 'WLAN-Router und Access Points prüfen, Netzwerk-SSID überprüfen'
      }
    ]
  },
  {
    id: 'internet_3',
    text: 'Funktioniert der Zugriff auf andere interne Systeme (z. B. Intranet)?',
    answers: [
      {
        id: 'internet_3_yes',
        text: 'Ja',
        nextQuestionId: 'internet_3_1'
      },
      {
        id: 'internet_3_no',
        text: 'Nein',
        action: 'Möglicher interner Netzwerkfehler → Switch/Verkabelung prüfen, VLAN-Konfiguration überprüfen'
      }
    ]
  },
  {
    id: 'internet_3_1',
    text: 'Können Sie bestimmte Webseiten nicht aufrufen oder ist das gesamte Internet nicht erreichbar?',
    answers: [
      {
        id: 'internet_3_1_specific',
        text: 'Nur bestimmte Webseiten',
        action: 'DNS-Einstellungen prüfen, Proxy-Konfiguration überprüfen, Firewall-Regeln anpassen'
      },
      {
        id: 'internet_3_1_all',
        text: 'Ganzes Internet nicht erreichbar',
        action: 'Provider prüfen, Router-Konfiguration überprüfen, WAN-Verbindung testen'
      }
    ]
  },
  {
    id: 'internet_4',
    text: 'Betrifft es ein gesamtes Stockwerk oder Netzwerksegment?',
    answers: [
      {
        id: 'internet_4_yes',
        text: 'Ja',
        nextQuestionId: 'internet_4_1'
      },
      {
        id: 'internet_4_no',
        text: 'Nein',
        action: 'Ggf. Nutzerfehler oder Fehlkonfiguration einzelner Geräte, DHCP-Server prüfen'
      }
    ]
  },
  {
    id: 'internet_4_1',
    text: 'Ist die Netzwerk-Infrastruktur (Switches, Router) in diesem Bereich kürzlich geändert worden?',
    answers: [
      {
        id: 'internet_4_1_yes',
        text: 'Ja',
        action: 'Änderungen rückgängig machen oder dokumentieren, Konfiguration überprüfen'
      },
      {
        id: 'internet_4_1_no',
        text: 'Nein',
        action: 'Infrastrukturproblem → Switch, DHCP oder Firewall prüfen, Netzwerk-Topologie analysieren'
      }
    ]
  },

  // Drucker-Probleme
  {
    id: 'printer_1',
    text: 'Ist der Drucker lokal oder im Netzwerk eingebunden?',
    answers: [
      {
        id: 'printer_1_local',
        text: 'Lokal',
        nextQuestionId: 'printer_2'
      },
      {
        id: 'printer_1_network',
        text: 'Netzwerkdrucker',
        nextQuestionId: 'printer_4'
      }
    ]
  },
  {
    id: 'printer_2',
    text: 'Wird der Drucker vom System erkannt?',
    answers: [
      {
        id: 'printer_2_yes',
        text: 'Ja',
        nextQuestionId: 'printer_3'
      },
      {
        id: 'printer_2_no',
        text: 'Nein',
        nextQuestionId: 'printer_2_1'
      }
    ]
  },
  {
    id: 'printer_2_1',
    text: 'Wird der Drucker im Geräte-Manager angezeigt?',
    answers: [
      {
        id: 'printer_2_1_yes',
        text: 'Ja',
        action: 'Treiber neu installieren, USB-Port wechseln, Kabel prüfen'
      },
      {
        id: 'printer_2_1_no',
        text: 'Nein',
        action: 'Hardware-Erkennung prüfen, BIOS/USB-Einstellungen überprüfen, Kabel defekt'
      }
    ]
  },
  {
    id: 'printer_3',
    text: 'Gibt es eine Fehlermeldung beim Drucken?',
    answers: [
      {
        id: 'printer_3_yes',
        text: 'Ja',
        nextQuestionId: 'printer_3_1'
      },
      {
        id: 'printer_3_no',
        text: 'Nein',
        action: 'Testseite aus System drucken → Hardwareproblem möglich, Druckkopf oder Toner prüfen'
      }
    ]
  },
  {
    id: 'printer_3_1',
    text: 'Welche Art von Fehlermeldung wird angezeigt?',
    answers: [
      {
        id: 'printer_3_1_paper',
        text: 'Papierstau oder Papierproblem',
        action: 'Papierstau beheben, Papierqualität prüfen, Einzugswalzen reinigen'
      },
      {
        id: 'printer_3_1_toner',
        text: 'Toner/Tinte leer oder fehlerhaft',
        action: 'Toner/Tinte wechseln, Kartusche prüfen, ggf. neu initialisieren'
      },
      {
        id: 'printer_3_1_other',
        text: 'Andere Fehlermeldung',
        action: 'Fehlermeldung notieren und Treiber prüfen, Drucker-Logs analysieren'
      }
    ]
  },
  {
    id: 'printer_4',
    text: 'Können andere Benutzer auf denselben Drucker zugreifen?',
    answers: [
      {
        id: 'printer_4_yes',
        text: 'Ja',
        nextQuestionId: 'printer_4_1'
      },
      {
        id: 'printer_4_no',
        text: 'Nein',
        action: 'Netzwerk- oder Serverproblem (Druckdienst prüfen), Print-Server Status überprüfen'
      }
    ]
  },
  {
    id: 'printer_4_1',
    text: 'Wird der Drucker im Netzwerk gefunden?',
    answers: [
      {
        id: 'printer_4_1_yes',
        text: 'Ja',
        action: 'Problem ist benutzerspezifisch → Treiber oder Queue prüfen, Benutzerrechte überprüfen'
      },
      {
        id: 'printer_4_1_no',
        text: 'Nein',
        action: 'Netzwerk-Konfiguration des Druckers prüfen, IP-Adresse und Port überprüfen'
      }
    ]
  },

  // Hardware-Probleme
  {
    id: 'hardware_1',
    text: 'Welches Gerät ist betroffen?',
    answers: [
      {
        id: 'hardware_1_laptop',
        text: 'Laptop/Desktop',
        nextQuestionId: 'hardware_2'
      },
      {
        id: 'hardware_1_peripheral',
        text: 'Peripheriegerät (Maus, Tastatur, Monitor)',
        nextQuestionId: 'hardware_4'
      }
    ]
  },
  {
    id: 'hardware_2',
    text: 'Startet das Gerät?',
    answers: [
      {
        id: 'hardware_2_yes',
        text: 'Ja',
        nextQuestionId: 'hardware_3'
      },
      {
        id: 'hardware_2_no',
        text: 'Nein',
        nextQuestionId: 'hardware_2_1'
      }
    ]
  },
  {
    id: 'hardware_2_1',
    text: 'Reagiert das Gerät überhaupt auf den Einschaltknopf?',
    answers: [
      {
        id: 'hardware_2_1_yes',
        text: 'Ja',
        action: 'Stromversorgung, Akku, Netzteil prüfen, BIOS-Reset durchführen'
      },
      {
        id: 'hardware_2_1_no',
        text: 'Nein',
        action: 'Netzteil defekt, Stromversorgung prüfen, Akku entfernen und direkt am Netzteil testen'
      }
    ]
  },
  {
    id: 'hardware_3',
    text: 'Gibt es akustische oder visuelle Fehlersignale (z. B. Pieptöne)?',
    answers: [
      {
        id: 'hardware_3_yes',
        text: 'Ja',
        action: 'POST-Fehlercode analysieren, BIOS-Version prüfen, Hardware-Komponenten testen'
      },
      {
        id: 'hardware_3_no',
        text: 'Nein',
        nextQuestionId: 'hardware_3_1'
      }
    ]
  },
  {
    id: 'hardware_3_1',
    text: 'Wird das Betriebssystem geladen?',
    answers: [
      {
        id: 'hardware_3_1_yes',
        text: 'Ja',
        action: 'Weitere Eingrenzung anhand sichtbarer Symptome, System-Logs prüfen'
      },
      {
        id: 'hardware_3_1_no',
        text: 'Nein',
        action: 'Festplatte, RAM und CPU prüfen, BIOS-Einstellungen überprüfen'
      }
    ]
  },
  {
    id: 'hardware_4',
    text: 'Wird das Gerät erkannt oder reagiert es?',
    answers: [
      {
        id: 'hardware_4_no',
        text: 'Nein',
        nextQuestionId: 'hardware_4_1'
      },
      {
        id: 'hardware_4_yes',
        text: 'Ja',
        action: 'Problem liegt nicht an der Verbindung → Software prüfen, Treiber aktualisieren'
      }
    ]
  },
  {
    id: 'hardware_4_1',
    text: 'Wurde das Gerät kürzlich angeschlossen oder ist es ein bestehendes Gerät?',
    answers: [
      {
        id: 'hardware_4_1_new',
        text: 'Neu angeschlossen',
        action: 'Anschluss, Port, Treiber oder Hardwaredefekt prüfen, USB-Port wechseln'
      },
      {
        id: 'hardware_4_1_existing',
        text: 'Bestehendes Gerät',
        action: 'Kabel prüfen, anderen Port testen, Treiber neu installieren'
      }
    ]
  },

  // Login-Probleme
  {
    id: 'login_1',
    text: 'Gibt es eine Fehlermeldung?',
    answers: [
      {
        id: 'login_1_yes',
        text: 'Ja',
        nextQuestionId: 'login_2'
      },
      {
        id: 'login_1_no',
        text: 'Nein',
        nextQuestionId: 'login_4'
      }
    ]
  },
  {
    id: 'login_2',
    text: 'Was ist der genaue Wortlaut der Fehlermeldung?',
    answers: [
      {
        id: 'login_2_credentials',
        text: 'Benutzername oder Passwort falsch',
        action: 'Passwort prüfen oder zurücksetzen, Caps Lock überprüfen'
      },
      {
        id: 'login_2_verify',
        text: 'Anmeldeinformationen konnten nicht überprüft werden',
        action: 'Netzwerkverbindung oder DC-Erreichbarkeit prüfen, DNS-Einstellungen überprüfen'
      },
      {
        id: 'login_2_locked',
        text: 'Konto gesperrt',
        action: 'Konto-Status prüfen, Administrator kontaktieren'
      },
      {
        id: 'login_2_other',
        text: 'Sonstige Meldung',
        action: 'Screenshot einfordern, weiter analysieren, Event-Logs prüfen'
      }
    ]
  },
  {
    id: 'login_4',
    text: 'Schwarzer Bildschirm oder Hänger nach Login?',
    answers: [
      {
        id: 'login_4_yes',
        text: 'Ja',
        nextQuestionId: 'login_4_1'
      },
      {
        id: 'login_4_no',
        text: 'Nein',
        action: 'Genaue Symptome einholen, Problem weiter eingrenzen'
      }
    ]
  },
  {
    id: 'login_4_1',
    text: 'Erscheint der Windows-Ladebildschirm?',
    answers: [
      {
        id: 'login_4_1_yes',
        text: 'Ja',
        action: 'Lokales Profil prüfen, temporäres Profil möglich, Startprogramme überprüfen'
      },
      {
        id: 'login_4_1_no',
        text: 'Nein',
        action: 'Grafiktreiber prüfen, Safe Mode testen, System-Wiederherstellung erwägen'
      }
    ]
  },

  // Software-Probleme
  {
    id: 'software_1',
    text: 'Betrifft das Problem eine bestimmte Anwendung?',
    answers: [
      {
        id: 'software_1_yes',
        text: 'Ja',
        nextQuestionId: 'software_2'
      },
      {
        id: 'software_1_no',
        text: 'Nein',
        nextQuestionId: 'software_1_1'
      }
    ]
  },
  {
    id: 'software_1_1',
    text: 'Welche Art von Systemproblem liegt vor?',
    answers: [
      {
        id: 'software_1_1_slow',
        text: 'System ist langsam',
        action: 'Ressourcenauslastung prüfen, Hintergrundprozesse analysieren, Festplatte defragmentieren'
      },
      {
        id: 'software_1_1_crash',
        text: 'System stürzt ab',
        action: 'Event-Logs prüfen, Treiber aktualisieren, Windows-Updates installieren'
      },
      {
        id: 'software_1_1_update',
        text: 'Update-Probleme',
        action: 'Windows Update Service prüfen, Update-Cache leeren, manuelle Updates durchführen'
      }
    ]
  },
  {
    id: 'software_2',
    text: 'Tritt das Problem bei allen Benutzern auf?',
    answers: [
      {
        id: 'software_2_yes',
        text: 'Ja',
        nextQuestionId: 'software_2_1'
      },
      {
        id: 'software_2_no',
        text: 'Nein',
        action: 'Lokales Problem → Logs prüfen, Neuinstallation erwägen, Benutzerprofil überprüfen'
      }
    ]
  },
  {
    id: 'software_2_1',
    text: 'Wurde die Anwendung kürzlich aktualisiert?',
    answers: [
      {
        id: 'software_2_1_yes',
        text: 'Ja',
        action: 'Update rückgängig machen, Kompatibilitätsmodus testen, Support kontaktieren'
      },
      {
        id: 'software_2_1_no',
        text: 'Nein',
        action: 'Serverseitige oder systemweite Störung möglich, Server-Logs prüfen'
      }
    ]
  },

  // E-Mail-Probleme
  {
    id: 'email_1',
    text: 'Wird eine Fehlermeldung angezeigt?',
    answers: [
      {
        id: 'email_1_yes',
        text: 'Ja',
        nextQuestionId: 'email_2'
      },
      {
        id: 'email_1_no',
        text: 'Nein',
        nextQuestionId: 'email_4'
      }
    ]
  },
  {
    id: 'email_2',
    text: 'Betrifft es Senden oder Empfangen?',
    answers: [
      {
        id: 'email_2_send',
        text: 'Senden',
        nextQuestionId: 'email_2_1'
      },
      {
        id: 'email_2_receive',
        text: 'Empfangen',
        nextQuestionId: 'email_2_2'
      }
    ]
  },
  {
    id: 'email_2_1',
    text: 'Welche Fehlermeldung erscheint beim Senden?',
    answers: [
      {
        id: 'email_2_1_auth',
        text: 'Authentifizierungsfehler',
        action: 'SMTP-Fehler prüfen, Authentifizierung analysieren, Anmeldedaten überprüfen'
      },
      {
        id: 'email_2_1_size',
        text: 'Datei zu groß',
        action: 'Anhang-Größe prüfen, Komprimierung erwägen, Alternative Transfermethode nutzen'
      },
      {
        id: 'email_2_1_other',
        text: 'Andere Fehlermeldung',
        action: 'Fehlermeldung dokumentieren, SMTP-Logs prüfen, Server-Status überprüfen'
      }
    ]
  },
  {
    id: 'email_2_2',
    text: 'Welche Art von Empfangsproblem liegt vor?',
    answers: [
      {
        id: 'email_2_2_spam',
        text: 'E-Mails landen im Spam',
        action: 'Spam-Filter prüfen, Absender-Adressen überprüfen, Whitelist erstellen'
      },
      {
        id: 'email_2_2_missing',
        text: 'E-Mails fehlen',
        action: 'Postfachstatus, Verbindungsfehler, Speicher prüfen, POP/IMAP-Einstellungen überprüfen'
      },
      {
        id: 'email_2_2_sync',
        text: 'Synchronisationsprobleme',
        action: 'E-Mail-Client neu konfigurieren, Cache leeren, Offline-Modus prüfen'
      }
    ]
  },
  {
    id: 'email_4',
    text: 'Werden Mails verspätet oder gar nicht zugestellt?',
    answers: [
      {
        id: 'email_4_yes',
        text: 'Ja',
        nextQuestionId: 'email_4_1'
      },
      {
        id: 'email_4_no',
        text: 'Nein',
        action: 'Weiterführende Informationen einholen, E-Mail-Client neu starten'
      }
    ]
  },
  {
    id: 'email_4_1',
    text: 'Betrifft es alle E-Mails oder nur bestimmte Absender?',
    answers: [
      {
        id: 'email_4_1_all',
        text: 'Alle E-Mails',
        action: 'Queues, Serverlast oder Routing prüfen, Mail-Server-Status überprüfen'
      },
      {
        id: 'email_4_1_specific',
        text: 'Nur bestimmte Absender',
        action: 'Absender-Domain prüfen, DNS-Einträge überprüfen, Spam-Filter analysieren'
      }
    ]
  }
]; 