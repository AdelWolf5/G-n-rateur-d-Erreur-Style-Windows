
import React from 'react';
import { ErrorIconType } from '../types';

interface ErrorDialogProps {
  title: string;
  message: string;
  iconType: ErrorIconType;
  onClose: () => void;
}

const getIconDetails = (iconType: ErrorIconType): { 
  titleBarIconClass: string; 
  titleBarIconColor: string;
  mainIconClass: string; 
  mainIconColor: string; 
  titleBarBgClass: string;
} => {
  switch (iconType) {
    case ErrorIconType.ERROR:
      return { 
        titleBarIconClass: 'fas fa-shield-alt', // Windows Security-like icon
        titleBarIconColor: 'text-white',
        mainIconClass: 'fas fa-times-circle', 
        mainIconColor: 'text-red-600', 
        titleBarBgClass: 'bg-[#CA0B00]' // Darker Red for title bar
      };
    case ErrorIconType.WARNING:
      return { 
        titleBarIconClass: 'fas fa-exclamation-triangle',
        titleBarIconColor: 'text-yellow-900', // Darker yellow for contrast on light bg
        mainIconClass: 'fas fa-exclamation-triangle', 
        mainIconColor: 'text-yellow-500', 
        titleBarBgClass: 'bg-[#005A9E]' // Standard Windows blue title
      };
    case ErrorIconType.INFO:
      return { 
        titleBarIconClass: 'fas fa-info-circle',
        titleBarIconColor: 'text-white',
        mainIconClass: 'fas fa-info-circle', 
        mainIconColor: 'text-blue-600', 
        titleBarBgClass: 'bg-[#005A9E]' // Standard Windows blue title
      };
    case ErrorIconType.QUESTION:
      return { 
        titleBarIconClass: 'fas fa-question-circle',
        titleBarIconColor: 'text-white',
        mainIconClass: 'fas fa-question-circle', 
        mainIconColor: 'text-blue-600', 
        titleBarBgClass: 'bg-[#005A9E]' // Standard Windows blue title
      };
    default: // Fallback to ERROR style
      return { 
        titleBarIconClass: 'fas fa-shield-alt',
        titleBarIconColor: 'text-white',
        mainIconClass: 'fas fa-times-circle', 
        mainIconColor: 'text-red-600', 
        titleBarBgClass: 'bg-[#CA0B00]'
      };
  }
};

export const ErrorDialog: React.FC<ErrorDialogProps> = ({ title, message, iconType, onClose }) => {
  const { 
    titleBarIconClass, 
    titleBarIconColor, 
    mainIconClass, 
    mainIconColor, 
    titleBarBgClass 
  } = getIconDetails(iconType);

  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} // Optional: close on backdrop click
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-message"
    >
      <div 
        className="bg-[#F0F0F0] w-[420px] max-w-full shadow-2xl border border-[#707070] rounded-[1px] font-['Segoe UI',_sans-serif] text-[12px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
      >
        {/* Title Bar */}
        <div className={`flex items-center justify-between h-[30px] px-2 ${titleBarBgClass} text-white select-none`}>
          <div className="flex items-center">
            <i className={`${titleBarIconClass} ${titleBarIconColor} text-[14px] mr-1.5`}></i>
            <span id="error-dialog-title" className="font-normal text-[13px] truncate" title={title}>{title}</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-600 active:bg-red-700 w-10 h-full flex items-center justify-center focus:outline-none focus:bg-red-500"
            aria-label="Fermer la boîte de dialogue"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <polygon points="10 1.007 9.002 0 5 3.998 1.007 0 0 1.007 3.993 5 0 8.993 1.007 10 5 6.002 8.993 10 10 8.993 6.007 5 10 1.007"/>
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 flex items-start space-x-4 bg-white text-black">
          <i className={`${mainIconClass} ${mainIconColor} text-[32px] mt-1 flex-shrink-0`}></i>
          <p id="error-dialog-message" className="text-black text-[12px] leading-snug whitespace-pre-wrap break-words min-h-[40px] flex-1 pt-1">
            {message}
          </p>
        </div>

        {/* Button Area */}
        <div className="bg-[#F0F0F0] p-[10px] flex justify-center border-t border-[#D4D4D4]">
          <button
            onClick={onClose}
            className="min-w-[90px] bg-[#E1E1E1] hover:bg-[#E5F1FB] active:bg-[#CCE4F7] border border-[#ADADAD] hover:border-[#0078D4] text-black px-5 py-[3px] rounded-[1px] focus:outline-none focus:ring-1 focus:ring-[#0078D4] focus:border-[#0078D4]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
