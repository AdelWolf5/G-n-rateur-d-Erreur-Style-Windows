
import React, { useState, useRef, useEffect } from 'react';
import { ErrorDialog } from './components/ErrorDialog';
import { ErrorIconType } from './types';

const App: React.FC = () => {
  const [errorTitle, setErrorTitle] = useState<string>('Erreur d\'application');
  const [errorMessage, setErrorMessage] = useState<string>('Une erreur inattendue s\'est produite. Veuillez contacter l\'administrateur système ou réessayer plus tard.\n\nCode d\'erreur: 0x80070005');
  const [selectedIcon, setSelectedIcon] = useState<ErrorIconType>(ErrorIconType.ERROR);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  // IMPORTANT: Pour que le son fonctionne, vous devez placer un fichier audio (ex: windows_error.mp3)
  // dans le dossier public/assets/sounds/ et vous assurer que le chemin est correct.
  // Pour cet exemple, le chemin est relatif au dossier public.
  // Si vous n'avez pas de dossier public, ajustez le chemin ou utilisez une URL complète.
  const errorSoundSrc = './assets/sounds/windows_error.mp3'; // MISE EN GARDE : Ce chemin suppose un dossier `public` servi à la racine.

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGenerateError = () => {
    setIsDialogOpen(true);
    if (audioRef.current) {
      // Réinitialiser la lecture si le son est déjà en cours ou terminé
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.warn("Lecture du son échouée. Assurez-vous que le fichier audio est accessible à l'URL spécifiée et que le navigateur autorise la lecture automatique.", error));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const iconOptions: { value: ErrorIconType; label: string }[] = [
    { value: ErrorIconType.ERROR, label: 'Erreur (Croix Rouge)' },
    { value: ErrorIconType.WARNING, label: 'Avertissement (Triangle Jaune)' },
    { value: ErrorIconType.INFO, label: 'Information (Bleu i)' },
    { value: ErrorIconType.QUESTION, label: 'Question (Point d\'interrogation Bleu)' },
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      <div className={`p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-xl transition-colors duration-300 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">Générateur d'Erreur Style Windows</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'hover:bg-slate-700 focus:ring-sky-400 focus:ring-offset-slate-800' : 'hover:bg-slate-200 focus:ring-sky-600 focus:ring-offset-white'}`}
            aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {darkMode ? <i className="fas fa-sun text-2xl text-yellow-400"></i> : <i className="fas fa-moon text-2xl text-indigo-500"></i>}
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="errorTitle" className="block text-sm font-medium mb-1.5">Titre de l'Erreur :</label>
            <input
              type="text"
              id="errorTitle"
              value={errorTitle}
              onChange={(e) => setErrorTitle(e.target.value)}
              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-300 ${darkMode ? 'bg-slate-700 border-slate-600 placeholder-slate-400 text-slate-100' : 'bg-white border-slate-300 placeholder-slate-400 text-slate-900'}`}
              placeholder="Ex: Erreur critique du système"
            />
          </div>

          <div>
            <label htmlFor="errorMessage" className="block text-sm font-medium mb-1.5">Message d'Erreur :</label>
            <textarea
              id="errorMessage"
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              rows={5}
              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-300 ${darkMode ? 'bg-slate-700 border-slate-600 placeholder-slate-400 text-slate-100' : 'bg-white border-slate-300 placeholder-slate-400 text-slate-900'}`}
              placeholder="Ex: L'opération demandée n'a pas pu être complétée en raison d'une défaillance matérielle."
            />
          </div>

          <div>
            <label htmlFor="errorIcon" className="block text-sm font-medium mb-1.5">Icône d'Erreur :</label>
            <div className="relative">
              <select
                id="errorIcon"
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value as ErrorIconType)}
                className={`w-full p-3 border rounded-lg shadow-sm appearance-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-300 ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-300 text-slate-900'}`}
              >
                {iconOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className={`absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleGenerateError}
            className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 active:scale-95"
          >
            <i className="fas fa-magic mr-2"></i>Générer l'Erreur
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <ErrorDialog
          title={errorTitle}
          message={errorMessage}
          iconType={selectedIcon}
          onClose={handleCloseDialog}
        />
      )}
      
      <audio ref={audioRef} src={errorSoundSrc} preload="auto" className="hidden"></audio>
      <footer className="mt-8 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        <p>Conçu avec <i className="fas fa-laptop-code mx-1"></i> et une touche d'humour.</p>
        <p>Application à des fins de divertissement uniquement.</p>
        <p className="mt-1 text-xs">Note: Pour le son d'erreur, placez <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">windows_error.mp3</code> (ou un autre fichier son) dans <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">public/assets/sounds/</code>.</p>
      </footer>
    </div>
  );
};

export default App;
