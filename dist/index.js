'use strict';

var React = require('react');
var axios = require('axios');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const Alert = ({
  type = 'error',
  message,
  className = ''
}) => {
  const types = {
    error: 'bg-red-100 border border-red-400 text-red-700',
    success: 'bg-green-100 border border-green-400 text-green-700',
    warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border border-blue-400 text-blue-700'
  };
  if (!message) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: `mt-2 px-4 py-3 rounded font-semibold ${types[type]} ${className}`
  }, message);
};

const AnimatedText = ({
  text,
  speed = 50,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);
  React.useEffect(() => {
    // Reset cuando cambia el texto
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-block"
  }, displayedText, currentIndex < text.length && /*#__PURE__*/React.createElement("span", {
    className: "animate-pulse"
  }, "|"));
};

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800'
  };
  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-0.5 text-sm',
    large: 'px-3 py-1 text-base'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  }, props), children);
};

const Box = ({
  children,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `bg-white overflow-hidden shadow-sm sm:rounded-lg ${className}`
  }, children);
};

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'medium',
  gameVariant = null,
  // Para variantes específicas del juego
  children,
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variantes estándar
  const standardVariants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white focus:ring-indigo-300 transform hover:scale-105 shadow-md hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white focus:ring-gray-300 transform hover:scale-105 shadow-md hover:shadow-lg',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-300 transform hover:scale-105 shadow-md hover:shadow-lg',
    success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-300 transform hover:scale-105 shadow-md hover:shadow-lg'
  };

  // Variantes específicas del juego
  const gameVariants = {
    reveal: "bg-white rounded-[10px] text-[#195b81] font-extrabold uppercase tracking-wide transition-all duration-300 ease-in hover:opacity-80",
    correct: "bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 boton-success-m rounded-[10px] button-overlay",
    incorrect: "bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 button-incorrect rounded-[10px] button-overlay",
    restart: "bg-green-600 text-white rounded-lg hover:bg-green-700 boton-success-m font-medium transition-all duration-200 transform hover:scale-105",
    exit: "bg-blue-600 text-white rounded-lg hover:bg-blue-700 boton-success-m font-medium transition-all duration-200 transform hover:scale-105"
  };
  const sizes = {
    small: 'px-3 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
    game: 'py-[15px] w-full',
    // Para botones del juego
    gameAction: 'px-4 py-3 w-full' // Para botones de acción del juego
  };

  // Determinar qué variante usar
  const variantClasses = gameVariant ? gameVariants[gameVariant] : standardVariants[variant];
  const sizeClasses = gameVariant ? sizes.game : sizes[size];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    onClick: onClick,
    disabled: disabled,
    className: `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`
  }, props), children);
};

const Card = ({
  children,
  variant = 'default',
  size = 'medium',
  selected = false,
  disabled = false,
  hoverable = true,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-white border rounded-lg transition-all duration-200 overflow-hidden';
  const variants = {
    default: 'border-gray-200 shadow-sm',
    outlined: 'border-gray-300 border-2 shadow-none',
    elevated: 'border-none shadow-lg',
    flat: 'bg-gray-50 border-none shadow-none'
  };
  const sizes = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };
  const stateClasses = selected ? 'bg-blue-50 border-blue-500 border-2 shadow-blue-100' : variants[variant];
  const hoverClasses = hoverable && onClick && !disabled ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : '';
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `${baseClasses} ${stateClasses} ${sizes[size]} ${hoverClasses} ${disabledClasses} ${className}`,
    onClick: !disabled ? onClick : undefined
  }, props), children);
};

const Checkbox = ({
  id,
  checked,
  onChange,
  label,
  value,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("label", {
    className: `inline-flex items-center ${className}`
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    value: value,
    className: "focus:border-tema1 focus:ring-tema1 rounded border-gray-300 text-indigo-600 checkbox-form"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2"
  }, label));
};

const Container = ({
  children,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `max-w-7xl mx-auto sm:px-6 lg:px-8 ${className}`
  }, children);
};

const Dropdown = ({
  trigger,
  children,
  align = 'right',
  width = '48'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  React.useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const alignmentClasses = {
    left: 'origin-top-left left-0',
    right: 'origin-top-right right-0'
  };
  const widthClasses = {
    '48': 'w-48'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "relative",
    ref: dropdownRef
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setIsOpen(!isOpen)
  }, trigger), isOpen && /*#__PURE__*/React.createElement("div", {
    className: `absolute z-50 mt-2 ${widthClasses[width]} rounded-md shadow-lg ${alignmentClasses[align]}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white"
  }, children)));
};

const EscapeButton = ({
  onClick,
  size = 'medium',
  className = '',
  ...props
}) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    className: `text-gray-400 hover:text-gray-600 focus:outline-none transition-colors ${className}`
  }, props), /*#__PURE__*/React.createElement("svg", {
    className: sizes[size],
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })));
};

const FileInput = ({
  id,
  onChange,
  accept = "image/*",
  className = '',
  error,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: "file",
    onChange: onChange,
    accept: accept,
    className: `w-full text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-80 file:sky-950 hover:file:cursor-pointer ${className}`
  }, props)), error && /*#__PURE__*/React.createElement("span", {
    className: "text-red-500 text-sm"
  }, error));
};

const Footer = ({
  className = ''
}) => {
  const currentYear = new Date().getFullYear();
  const appName = process.env.REACT_APP_NAME || 'MBS';
  return /*#__PURE__*/React.createElement("footer", {
    className: `bg-footer text-white z-10 footer-mbs flex flex-col md:flex-row justify-between px-[20px] md:px-[50px] py-[35px] ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-center mb-3 md:mb-0"
  }, "\xA9 ", currentYear, " ", appName, ". Todos los derechos reservados."), /*#__PURE__*/React.createElement("div", {
    className: "text-sm flex flex-col md:flex-row gap-4 underline text-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://medbystudents.com/libro-de-reclamaciones/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:text-gray-300 transition-colors"
  }, "Libro de reclamaciones"), /*#__PURE__*/React.createElement("a", {
    href: "https://medbystudents.com/politicas-de-privacidad/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:text-gray-300 transition-colors"
  }, "Pol\xEDticas de privacidad")));
};

const FullScreenLoader = ({
  show,
  message = 'Cargando...',
  subMessage = 'Por favor espera'
}) => {
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-lg p-8 text-center shadow-2xl max-w-sm mx-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-spin rounded-full h-16 w-16 border-b-4 border-tema1 mx-auto mb-6"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 animate-spin rounded-full h-16 w-16 border-r-4 border-tema2 mx-auto",
    style: {
      animationDuration: '3s'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-gray-800 mb-2"
  }, message), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mb-4"
  }, subMessage), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-200 rounded-full h-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-tema1 h-2 rounded-full animate-pulse",
    style: {
      width: '70%'
    }
  }))));
};

const Icon = ({
  type = 'default',
  gameType = null,
  // Para iconos específicos del juego
  size = 'medium',
  className = '',
  ...props
}) => {
  // Iconos del juego
  const gameIcons = {
    question: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnMiIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMjYuMiAxMjYuMiINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI2LjIgMTI2LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ni44LDEyNi4yYy0yLjUsMC00LjksMC03LjQsMGMtMC4zLTAuMS0wLjYtMC4yLTEtMC4yYy04LjgtMC42LTE3LjItMi45LTI1LTcuMkMxNS43LDEwOSw0LjgsOTQuMSwxLDc0LjENCgkJYy0wLjUtMi40LTAuNy00LjktMS03LjNjMC0yLjUsMC00LjksMC03LjRjMC4xLTAuNCwwLjItMC43LDAuMi0xLjFjMC42LTguOCwyLjktMTcuMiw3LjItMjQuOUMxOSwxMi44LDM2LjgsMS42LDYwLjQsMC4xDQoJCUM3MC43LTAuNSw4MC41LDEuNCw4OS43LDZjMjIuNSwxMS4yLDM0LjcsMjkuNCwzNi40LDU0LjVjMC44LDExLjUtMS44LDIyLjQtNy40LDMyLjVjLTkuOCwxNy43LTI0LjgsMjguNS00NC43LDMyLjMNCgkJQzcxLjYsMTI1LjcsNjkuMiwxMjUuOSw2Ni44LDEyNi4yeiBNMTE2LjMsNjMuMkMxMTYuNCwzMy44LDkyLjYsMTAsNjMuMiw5LjlDMzMuOCw5LjgsOS45LDMzLjYsOS45LDYzLjENCgkJQzkuOCw5Mi40LDMzLjYsMTE2LjIsNjMsMTE2LjNDOTIuMywxMTYuNCwxMTYuMyw5Mi42LDExNi4zLDYzLjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjEsMzEuN2M5LjUsMCwxNy45LDcsMTkuNSwxNi4zYzEuNiw5LjctMy45LDE5LTEzLjEsMjJjLTEuMSwwLjQtMS41LDAuOC0xLjQsMmMwLjEsMi4xLDAsNC4yLDAsNi4zDQoJCWMwLDMtMi4xLDUuMi01LDUuMWMtMi44LDAtNC45LTIuMS00LjktNS4xYzAtNCwwLTgsMC0xMS45YzAtMi44LDEuNy00LjgsNC41LTVjMy4zLTAuMyw2LjEtMS4yLDguMS0zLjljMi40LTMuMiwyLjgtNi43LDEtMTAuMw0KCQljLTEuOC0zLjctNS01LjYtOS4yLTUuNWMtNSwwLjItOC43LDMuNy05LjQsOC43Yy0wLjEsMC40LTAuMSwwLjktMC4xLDEuM2MtMC4zLDIuOC0yLjQsNC43LTUuMSw0LjZjLTIuNy0wLjEtNC44LTIuMi00LjctNQ0KCQljMC4yLTcsMy4yLTEyLjUsOS4xLTE2LjRDNTUuNywzMi43LDU5LjIsMzEuNyw2My4xLDMxLjd6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjMsODcuMmMzLjQsMC4xLDYuMSwzLDYsNi40Yy0wLjEsMy40LTMsNi02LjMsNS45Yy0zLjQtMC4xLTYuMS0zLTYtNi40QzU3LjEsODkuNyw1OS45LDg3LjEsNjMuMyw4Ny4yeiIvPg0KPC9nPg0KPC9zdmc+DQo=",
    answer: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnMiIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMjYuMiAxMjYuMiINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI2LjIgMTI2LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMxOTVCODE7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04NC4xLDQxLjhjMy45LDAuNyw4LDEsMTEuNywyLjNjMTYuOCw1LjUsMjYuNywxNy4yLDI5LjQsMzQuN2MxLjEsNy41LDAsMTQuNy0zLDIxLjcNCgkJYy0wLjIsMC41LTAuMywxLjItMC4yLDEuOGMxLjEsNi4zLDIuMywxMi42LDMuNCwxOC45YzAuNSwzLTEuMyw0LjktNC4zLDQuNGMtNS41LTAuOS0xMC45LTEuOS0xNi4zLTNjLTIuMi0wLjQtNC4yLTAuNC02LjQsMC41DQoJCWMtMjQsOC45LTUwLjItNS42LTU1LjQtMzAuN2MtMC42LTIuNy0wLjctNS40LTEtOC4xYy0yLjctMC4zLTUuNS0wLjUtOC4yLTEuMWMtMi42LTAuNi01LjItMS42LTcuNy0yLjNjLTAuOC0wLjItMS43LTAuNC0yLjUtMC4zDQoJCWMtNi4xLDEuMS0xMi4yLDIuMi0xOC40LDMuNGMtMy4yLDAuNi01LjItMS4zLTQuNi00LjVDMS44LDczLDMsNjYuOCw0LjEsNjAuNWMwLjEtMC42LDAtMS4zLTAuMi0xLjhDLTQuNiwzOC40LDMuNywxNS4zLDIzLjIsNS4yDQoJCUM0Ny4zLTcuMyw3Nyw2LjYsODIuOSwzMy4xQzgzLjUsMzYuMSw4My43LDM5LjEsODQuMSw0MS44eiIvPg0KPC9nPg0KPC9zdmc+DQo="
  };
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    game: 'w-8 h-8 mx-auto mb-4'
  };
  if (gameType) {
    return /*#__PURE__*/React.createElement("img", _extends({
      className: `icon-card__answer ${sizes.game} ${className}`,
      src: gameIcons[gameType],
      alt: gameType === 'question' ? 'Pregunta' : 'Respuesta'
    }, props));
  }

  // Para iconos estándar, podrías usar SVG inline o una librería como Heroicons
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `${sizes[size]} ${className}`
  }, props));
};

const IconButton = ({
  icon,
  variant = 'default',
  size = 'medium',
  disabled = false,
  onClick,
  title,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    primary: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
    danger: 'text-red-600 hover:text-red-700 hover:bg-red-50 focus:ring-red-500',
    success: 'text-green-600 hover:text-green-700 hover:bg-green-50 focus:ring-green-500'
  };
  const sizes = {
    small: 'w-6 h-6 text-sm',
    medium: 'w-8 h-8 text-base',
    large: 'w-10 h-10 text-lg'
  };
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`,
    onClick: !disabled ? onClick : undefined,
    disabled: disabled,
    title: title
  }, props), icon);
};

const Image$1 = ({
  src,
  alt,
  variant = 'default',
  gameType = null,
  // Para imágenes específicas del juego
  onClick,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'object-cover rounded',
    preview: 'max-w-full h-auto rounded-lg shadow-md',
    thumbnail: 'w-16 h-16 object-cover rounded',
    avatar: 'w-10 h-10 object-cover rounded-full'
  };
  const gameVariants = {
    question: 'img-answer cursor-pointer max-w-32 max-h-32 object-cover rounded',
    answer: 'img-answer img-answer-response cursor-pointer max-w-32 max-h-32 object-cover rounded'
  };
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (gameType) {
      window.open(src, '_blank');
    }
  };
  if (!src) return null;
  const variantClasses = gameType ? gameVariants[gameType] : variants[variant];
  const isClickable = onClick || gameType;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    onClick: isClickable ? handleClick : undefined,
    className: `${variantClasses} ${isClickable ? 'cursor-pointer' : ''} ${className}`
  }, props));
};

const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  // ← Agregar soporte para onBlur
  placeholder,
  className = '',
  error,
  disabled = false,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    value: value,
    onChange: onChange,
    onBlur: onBlur // ← Pasar onBlur
    ,
    placeholder: placeholder,
    disabled: disabled,
    className: `mt-1 block w-full rounded border-gray-300 focus:border-tema1 focus:ring-tema1 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${error ? 'border-red-500' : ''} ${className}`
  }, props)), error && /*#__PURE__*/React.createElement("span", {
    className: "text-red-500 text-sm"
  }, error));
};

const Label = ({
  htmlFor,
  children,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    className: `block text-gray-700 ${className}`
  }, children);
};

const Logo = ({
  className = ''
}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return /*#__PURE__*/React.createElement("div", {
    className: `shrink-0 flex mr-24 pr-24 site-logo ${className}`
  }, /*#__PURE__*/React.createElement("a", {
    href: baseUrl
  }, /*#__PURE__*/React.createElement("img", {
    src: "/logo.svg",
    alt: "MBS - Med By Students",
    className: "block h-9"
  })));
};

const MotivationalMessage = ({
  percentage,
  className = ''
}) => {
  const getMessage = () => {
    if (percentage >= 90) return '¡Increíble! Dominas perfectamente el tema.';
    if (percentage >= 80) return '¡Muy bien! Tienes un excelente conocimiento.';
    if (percentage >= 70) return '¡Buen trabajo! Vas por buen camino.';
    if (percentage >= 60) return 'Bien hecho, pero puedes mejorar un poco más.';
    return 'Sigue practicando, ¡cada intento te hace mejor!';
  };
  const getEmoji = () => {
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👍';
    return '📚';
  };
  const getTitle = () => {
    if (percentage >= 80) return '¡Excelente!';
    if (percentage >= 60) return '¡Bien hecho!';
    return '¡Sigue practicando!';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `text-center mb-6 ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-4"
  }, getEmoji()), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-gray-800 mb-4"
  }, getTitle()), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, getMessage()));
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dist = {};

Object.defineProperty(dist, "__esModule", { value: true });
dist.parse = parse$2;
dist.serialize = serialize;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 *
 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
 * Allow same range as cookie value, except `=`, which delimits end of name.
 */
const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 *
 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
 */
const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */
const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */
const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (() => {
    const C = function () { };
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */
function parse$2(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2)
        return obj;
    const dec = options?.decode || decode;
    let index = 0;
    do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
            break; // No more cookie pairs.
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (obj[key] === undefined) {
            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            let valEndIdx = endIndex(str, endIdx, valStartIdx);
            const value = dec(str.slice(valStartIdx, valEndIdx));
            obj[key] = value;
        }
        index = endIdx + 1;
    } while (index < len);
    return obj;
}
function startIndex(str, index, max) {
    do {
        const code = str.charCodeAt(index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index;
    } while (++index < max);
    return max;
}
function endIndex(str, index, min) {
    while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 */
function serialize(name, val, options) {
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value;
    if (!options)
        return str;
    if (options.maxAge !== undefined) {
        if (!Number.isInteger(options.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
            throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
    }
    if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
            throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
    }
    if (options.expires) {
        if (!isDate(options.expires) ||
            !Number.isFinite(options.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
        str += "; HttpOnly";
    }
    if (options.secure) {
        str += "; Secure";
    }
    if (options.partitioned) {
        str += "; Partitioned";
    }
    if (options.priority) {
        const priority = typeof options.priority === "string"
            ? options.priority.toLowerCase()
            : undefined;
        switch (priority) {
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
    }
    if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string"
            ? options.sameSite.toLowerCase()
            : options.sameSite;
        switch (sameSite) {
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */
function decode(str) {
    if (str.indexOf("%") === -1)
        return str;
    try {
        return decodeURIComponent(str);
    }
    catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */
function isDate(val) {
    return __toString.call(val) === "[object Date]";
}

/**
 * react-router v7.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "") {
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    if (route.path === "" || !route.path?.includes("?")) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (_, paramName, isOptional) => {
      params.push({ paramName, isOptional: isOptional != null });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    }
  );
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}

// lib/router/router.ts
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
new Set(validRequestMethodsArr);
var DataRouterContext = React__namespace.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = React__namespace.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var ViewTransitionContext = React__namespace.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = React__namespace.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = React__namespace.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = React__namespace.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = React__namespace.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = React__namespace.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = React__namespace.createContext(null);
RouteErrorContext.displayName = "RouteError";
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator } = React__namespace.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return React__namespace.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return React__namespace.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = React__namespace.useContext(NavigationContext).static;
  if (!isStatic) {
    React__namespace.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = React__namespace.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = React__namespace.useContext(DataRouterContext);
  let { basename, navigator } = React__namespace.useContext(NavigationContext);
  let { matches } = React__namespace.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = React__namespace.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React__namespace.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator.replace : navigator.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
React__namespace.createContext(null);
function useResolvedPath(to, { relative } = {}) {
  let { matches } = React__namespace.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return React__namespace.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator } = React__namespace.useContext(NavigationContext);
  let { matches: parentMatches } = React__namespace.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterState,
    future
  );
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React__namespace.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React__namespace.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React__namespace.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React__namespace.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ React__namespace.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ React__namespace.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends React__namespace.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "React Router caught the following error during render",
      error,
      errorInfo
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ React__namespace.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ React__namespace.createElement(
      RouteErrorContext.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = React__namespace.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ React__namespace.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterState = null, future = null) {
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState?.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && errors?.[m.route.id] !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce(
            "route-fallback",
            false,
            "No `HydrateFallback` element provided to render during initial hydration"
          );
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ React__namespace.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ React__namespace.createElement(
        RenderedRoute,
        {
          match,
          routeContext: {
            outlet,
            matches: matches2,
            isDataRoute: dataRouterState != null
          },
          children
        }
      );
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React__namespace.createElement(
      RenderErrorBoundary,
      {
        location: dataRouterState.location,
        revalidation: dataRouterState.revalidation,
        component: errorElement,
        error,
        children: getChildren(),
        routeContext: { outlet: null, matches: matches2, isDataRoute: true }
      }
    ) : getChildren();
  }, null);
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = React__namespace.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = React__namespace.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = React__namespace.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId("useRouteId" /* UseRouteId */);
}
function useRouteError() {
  let error = React__namespace.useContext(RouteErrorContext);
  let state = useDataRouterState("useRouteError" /* UseRouteError */);
  let routeId = useCurrentRouteId("useRouteError" /* UseRouteError */);
  if (error !== void 0) {
    return error;
  }
  return state.errors?.[routeId];
}
function useNavigateStable() {
  let { router } = useDataRouterContext("useNavigate" /* UseNavigateStable */);
  let id = useCurrentRouteId("useNavigate" /* UseNavigateStable */);
  let activeRef = React__namespace.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React__namespace.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
React__namespace.memo(DataRoutes);
function DataRoutes({
  routes,
  future,
  state
}) {
  return useRoutesImpl(routes, void 0, state, future);
}

// lib/dom/dom.ts
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}

// lib/dom/ssr/invariant.ts
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

// lib/dom/ssr/routeModules.ts
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    undefined) {
      throw error;
    }
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([100, 101, 204, 205]);
function singleFetchUrl(reqUrl, basename) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = "_root.data";
  } else if (basename && stripBasename(url.pathname, basename) === "/") {
    url.pathname = `${basename.replace(/\/$/, "")}/_root.data`;
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.data`;
  }
  return url;
}

// lib/dom/ssr/components.tsx
function useDataRouterContext2() {
  let context = React__namespace.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = React__namespace.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = React__namespace.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = React__namespace.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = React__namespace.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = React__namespace.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = React__namespace.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = React__namespace.useRef(null);
  React__namespace.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  React__namespace.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let { router } = useDataRouterContext2();
  let matches = React__namespace.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */ React__namespace.createElement(PrefetchPageLinksImpl, { page, matches, ...dataLinkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React__namespace.useState([]);
  React__namespace.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = React__namespace.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = React__namespace.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = React__namespace.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page, basename);
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = React__namespace.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, dataHrefs.map((href2) => /* @__PURE__ */ React__namespace.createElement("link", { key: href2, rel: "prefetch", as: "fetch", href: href2, ...linkProps })), moduleHrefs.map((href2) => /* @__PURE__ */ React__namespace.createElement("link", { key: href2, rel: "modulepreload", href: href2, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React__namespace.createElement("link", { key, ...link })
  )));
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

// lib/dom/lib.tsx
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser) {
    window.__reactRouterVersion = "7.6.1";
  }
} catch (e) {
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = React__namespace.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    ...rest
  }, forwardedRef) {
    let { basename } = React__namespace.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let absoluteHref;
    let isExternal = false;
    if (typeof to === "string" && isAbsolute) {
      absoluteHref = to;
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
          let path = stripBasename(targetUrl.pathname, basename);
          if (targetUrl.origin === currentUrl.origin && path != null) {
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          warning(
            false,
            `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
          );
        }
      }
    }
    let href2 = useHref(to, { relative });
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ React__namespace.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: absoluteHref || href2,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, link, /* @__PURE__ */ React__namespace.createElement(PrefetchPageLinks, { page: href2 })) : link;
  }
);
Link.displayName = "Link";
var NavLink$1 = React__namespace.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = React__namespace.useContext(DataRouterStateContext);
    let { navigator, basename } = React__namespace.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ React__namespace.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink$1.displayName = "NavLink";
var Form = React__namespace.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    ...props
  }, forwardedRef) => {
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = submitter?.getAttribute("formmethod") || method;
      submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition
      });
    };
    return /* @__PURE__ */ React__namespace.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = React__namespace.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return React__namespace.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        navigate(to, {
          replace: replace2,
          state,
          preventScrollReset,
          relative,
          viewTransition
        });
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3("useSubmit" /* UseSubmit */);
  let { basename } = React__namespace.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return React__namespace.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await router.fetch(key, currentRouteId, options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await router.navigate(options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [router, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = React__namespace.useContext(NavigationContext);
  let routeContext = React__namespace.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, opts = {}) {
  let vtContext = React__namespace.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState" /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative: opts.relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// lib/server-runtime/single-fetch.ts
/* @__PURE__ */ new Set([
  ...NO_BODY_STATUS_CODES,
  304
]);

const NavLink = ({
  href,
  children,
  active = false,
  className = ''
}) => {
  const location = useLocation();
  const isActive = active || location.pathname === href;
  const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none";
  const activeClasses = "border-indigo-400 text-gray-900 focus:border-indigo-700";
  const inactiveClasses = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300";
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`
  }, children);
};

const Overlay = ({
  isVisible = false,
  onClick,
  opacity = 'bg-opacity-50',
  className = '',
  ...props
}) => {
  if (!isVisible) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `fixed inset-0 bg-black ${opacity} transition-opacity ${className}`,
    onClick: onClick
  }, props));
};

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  disabled = false,
  onClear,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({
        target: {
          value: ''
        }
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "h-5 w-5 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }))), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    className: `${baseClasses} ${disabledClasses} ${className}`
  }, props)), value && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-y-0 right-0 pr-3 flex items-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleClear,
    className: "text-gray-400 hover:text-gray-600 focus:outline-none"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))));
};

const Tab = ({
  children,
  active = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${active ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`,
    onClick: !disabled ? onClick : undefined,
    disabled: disabled
  }, props), children);
};

const TextArea = ({
  id,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = '',
  error,
  disabled = false,
  ...props
}) => {
  const textareaRef = React.useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    ref: textareaRef,
    id: id,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    className: `mt-1 block w-full rounded border-gray-300 focus:border-tema1 focus:ring-tema1 resize-vertical transition-all duration-200 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`,
    disabled: disabled
  }, props)), error && /*#__PURE__*/React.createElement("span", {
    className: "text-red-500 text-sm"
  }, error));
};

const Title = ({
  children,
  level = 'h2',
  className = ''
}) => {
  const Tag = level;
  const baseClasses = 'font-semibold text-xl text-gray-800 leading-tight';
  return /*#__PURE__*/React.createElement(Tag, {
    className: `${baseClasses} ${className}`
  }, children);
};

const ToggleButton = ({
  id,
  value,
  checked = false,
  onChange,
  children,
  className = '',
  disabled = false
}) => {
  const baseClasses = "px-4 py-2 border rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-tema1 focus:ring-offset-2";
  const selectedClasses = "bg-tema1 text-white border-tema1 shadow-md";
  const unselectedClasses = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: id,
    value: value,
    onClick: () => !disabled && onChange(value),
    disabled: disabled,
    "aria-pressed": checked,
    className: `
                ${baseClasses} 
                ${checked ? selectedClasses : unselectedClasses}
                ${disabled ? disabledClasses : ''}
                ${className}
            `
  }, children);
};

const ActionButtons = ({
  selectedCount = 0,
  totalCount = 0,
  categorySelectedCount = 0,
  categoryTotalCount = 0,
  allSelected = false,
  // ← Prop del padre
  categoryAllSelected = false,
  // ← Prop del padre
  onStartGame,
  onSelectAll,
  onDeselectAll,
  onSelectCategory,
  onDeselectCategory,
  onCreateFlashcard,
  onCreateCategory,
  disabled = false,
  className = '',
  ...props
}) => {
  const hasSelected = selectedCount > 0;

  // ✅ USAR LAS PROPS DIRECTAMENTE, NO RECALCULAR
  // Las props ya vienen calculadas desde FlashcardList

  return /*#__PURE__*/React.createElement("div", _extends({
    className: `flex items-center justify-between gap-4 p-4 bg-white border-t border-gray-200 ${className}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, allSelected ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onDeselectAll,
    disabled: disabled,
    className: "text-sm"
  }, "Deseleccionar todas (", totalCount, ")") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onSelectAll,
    disabled: disabled || totalCount === 0,
    className: "text-sm"
  }, "Seleccionar todas (", totalCount, ")"), categoryTotalCount > 0 && (categoryAllSelected ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onDeselectCategory,
    disabled: disabled,
    className: "text-sm"
  }, "Deseleccionar categor\xEDa (", categoryTotalCount, ")") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onSelectCategory,
    disabled: disabled,
    className: "text-sm"
  }, "Seleccionar categor\xEDa (", categoryTotalCount, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onCreateCategory,
    disabled: disabled
  }, "+ Nueva Categor\xEDa"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onCreateFlashcard,
    disabled: disabled
  }, "+ Nueva Flashcard"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onStartGame,
    disabled: !hasSelected || disabled,
    className: "flex items-center gap-2 px-6 py-2 text-sm font-medium"
  }, "\uD83C\uDFAE Empezar Juego", hasSelected && /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    size: "small"
  }, selectedCount)))));
};

const CategorySelector = ({
  categories = [],
  selectedCategories = [],
  onChange,
  className = ''
}) => {
  // ✅ FILTRAR CATEGORÍAS VÁLIDAS
  const validCategories = categories.filter(category => category && category.id !== undefined && category.nombre !== undefined);
  const handleCategoryToggle = categoryId => {
    const newSelected = selectedCategories.includes(categoryId) ? selectedCategories.filter(id => id !== categoryId) : [...selectedCategories, categoryId];
    onChange(newSelected);
  };
  if (validCategories.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: `mb-4 ${className}`
    }, /*#__PURE__*/React.createElement(Label, null, "Categor\xEDas (opcional)"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-500 text-sm mt-2"
    }, "No tienes categor\xEDas creadas. Crea una categor\xEDa primero."));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-4 ${className}`
  }, /*#__PURE__*/React.createElement(Label, null, "Categor\xEDas (opcional)"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex flex-wrap gap-2",
    role: "group",
    "aria-label": "Seleccionar categor\xEDas"
  }, validCategories.map(category => /*#__PURE__*/React.createElement(ToggleButton, {
    key: category.id,
    id: `category-${category.id}`,
    value: category.id,
    checked: selectedCategories.includes(category.id),
    onChange: handleCategoryToggle,
    className: "text-sm"
  }, category.nombre))), selectedCategories.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-sm text-gray-600"
  }, "Seleccionadas: ", selectedCategories.length, " categor\xEDa", selectedCategories.length !== 1 ? 's' : ''));
};

const ContentBox = ({
  children,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement(Box, {
    className: `p-6 ${className}`
  }, children);
};

const FileField = ({
  id,
  label,
  onChange,
  error,
  accept = "image/*",
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-4 ${className}`
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: id
  }, label), /*#__PURE__*/React.createElement(FileInput, {
    id: id,
    onChange: onChange,
    accept: accept,
    error: error
  }));
};

const FlashcardFlip = ({
  children,
  showAnswer,
  slideDirection,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "pb-10 game-space"
  }, /*#__PURE__*/React.createElement("div", {
    className: `relative perspective-1000 w-full transition-all duration-400 ${slideDirection === 'left' ? 'slide-left' : slideDirection === 'right' ? 'slide-right' : ''} ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `card-inner w-full transition-transform duration-500 transform-style-3d ${showAnswer ? 'rotate-y-180' : ''}`
  }, children)));
};

const SelectFlashCard = ({
  flashcard,
  selected = false,
  onSelect,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
  className = '',
  ...props
}) => {
  return /*#__PURE__*/React.createElement(Card, _extends({
    selected: selected,
    onClick: onSelect,
    hoverable: true,
    className: `relative cursor-pointer flex-shrink-0 w-64 h-48 border rounded-lg shadow-md transition-all duration-200 hover:shadow-lg overflow-y-hidden hover:overflow-y-auto ${selected ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'bg-white border-gray-200'} ${className}` // ← rounded-lg, shadow-md, ring para seleccionadas
  }, props), /*#__PURE__*/React.createElement("div", {
    className: `pt-8`
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-lg"
  }, flashcard.pregunta)), (canEdit || canDelete) && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-1 absolute right-2 top-2 z-10"
  }, canEdit && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onEdit?.(flashcard);
    },
    className: "px-2 py-1 bg-[#5b8080] text-white rounded hover:bg-[#4a6f6f] text-xs flex items-center gap-1",
    title: "Editar"
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-[17px]",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAAKVQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uP3jVQAAADd0Uk5TAA0zEQWU/P+rrf6WTIT6nmsSeE0y+c8TmAyubT700BRmg2xF9nn4ofuRSESHC8bECtQwxYZHLXliBKEAAADPSURBVHicbc9fC8FQGMfx58dwsSQp5g4jJSQX3v9bkOQKnRDbhZBo7Z9zhthz9lxs6/M9Pe2AtAEQyidnQzrBi3kwCkjmCs2LF6JyWALzyDzLd+1eBjtvAg6R9TD/g1G/VNV+0XIbW6TOWxuycascYj8AcyI7L3J+8LuH2nNQHy1Xnv9dkPs3aP4Jur9Dhichy1XIdBX6u+T/qXP6cxmaFax0l2Gw7i75niQMHWuhuwxjzCd+JJgTRsKOtl47XqedMF2WesD+SGxAs+eCo5oXGpptV/4P7iMAAAAASUVORK5CYII=",
    alt: "Boton Editar"
  }), "Editar"), canDelete && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onDelete?.(flashcard);
    },
    className: "px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs flex items-center gap-1",
    title: "Eliminar"
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-[17px]",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMxQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////OpLhCAAAAER0Uk5TAB6guwXf7sLeSv9QZd3A6/Kp1teomuXmmYv09Yp9BG0SvxNsXiEiXU8wMU5AP2AgDXR1C/aOy8puUgbIaGnH0blHk7WaBofeAAABGklEQVR4nHXRWUsDMRAA4BldkLbrg9SDUtpla+tRpIhHPZ70l+uTWLRIK15V67rWUrT64tZ9iYybjLskigMhk3xDQjII/wQmCcqUiH6BFYEAi8aEMCGFOIqmDFEYg62y9JelQIx/qrpAgo0fxr2TFEgAmMJ3A7I45Dtm8MWAORww5LBvQB57DIW3aR/AhkANKA6zTwzO66wH4MKDGlAa5O4Zyv38rQYLvcINw5LvXGlQ9dwLhpXu/LkGvJTAJQnwARIqz+W2BrW7SothtbN4psHa9XLz53c38ER7xyadxt9ex4b28C1oxLDdVs3g2GnVjmPYRc/1fbVddML0kUg6WHqcqGbCJqynRpd1v6u3dh/xMJr2iA7Mnv+Jb5RQaBkMZdeJAAAAAElFTkSuQmCC",
    alt: "Boton Eliminar"
  }), "Eliminar")), !canEdit && !canDelete && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end absolute right-3 top-3 gap-[10px] cursor-not-allowed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-black/50 absolute w-full h-full rounded-[5px]"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "px-2 py-1 bg-[#5b8080] text-white rounded hover:bg-white hover:text-[#5b8080] text-xs flex items-center gap-1 cursor-not-allowed",
    title: "Editar",
    disabled: true
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-[17px]",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAAKVQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uP3jVQAAADd0Uk5TAA0zEQWU/P+rrf6WTIT6nmsSeE0y+c8TmAyubT700BRmg2xF9nn4ofuRSESHC8bECtQwxYZHLXliBKEAAADPSURBVHicbc9fC8FQGMfx58dwsSQp5g4jJSQX3v9bkOQKnRDbhZBo7Z9zhthz9lxs6/M9Pe2AtAEQyidnQzrBi3kwCkjmCs2LF6JyWALzyDzLd+1eBjtvAg6R9TD/g1G/VNV+0XIbW6TOWxuycascYj8AcyI7L3J+8LuH2nNQHy1Xnv9dkPs3aP4Jur9Dhichy1XIdBX6u+T/qXP6cxmaFax0l2Gw7i75niQMHWuhuwxjzCd+JJgTRsKOtl47XqedMF2WesD+SGxAs+eCo5oXGpptV/4P7iMAAAAASUVORK5CYII=",
    alt: "Boton Editar"
  }), "Editar"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs flex items-center gap-1 cursor-not-allowed",
    title: "Eliminar",
    disabled: true
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-[17px]",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMxQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////OpLhCAAAAER0Uk5TAB6guwXf7sLeSv9QZd3A6/Kp1teomuXmmYv09Yp9BG0SvxNsXiEiXU8wMU5AP2AgDXR1C/aOy8puUgbIaGnH0blHk7WaBofeAAABGklEQVR4nHXRWUsDMRAA4BldkLbrg9SDUtpla+tRpIhHPZ70l+uTWLRIK15V67rWUrT64tZ9iYybjLskigMhk3xDQjII/wQmCcqUiH6BFYEAi8aEMCGFOIqmDFEYg62y9JelQIx/qrpAgo0fxr2TFEgAmMJ3A7I45Dtm8MWAORww5LBvQB57DIW3aR/AhkANKA6zTwzO66wH4MKDGlAa5O4Zyv38rQYLvcINw5LvXGlQ9dwLhpXu/LkGvJTAJQnwARIqz+W2BrW7SothtbN4psHa9XLz53c38ER7xyadxt9ex4b28C1oxLDdVs3g2GnVjmPYRc/1fbVddML0kUg6WHqcqGbCJqynRpd1v6u3dh/xMJr2iA7Mnv+Jb5RQaBkMZdeJAAAAAElFTkSuQmCC",
    alt: "Boton Eliminar"
  }), "Eliminar")));
};

const FlashcardSlider = ({
  flashcards = [],
  selectedIds = [],
  onSelectFlashcard,
  onEditFlashcard,
  onDeleteFlashcard,
  canEdit = false,
  canDelete = false,
  className = '',
  ...props
}) => {
  const sliderRef = React.useRef(null);
  const scroll = direction => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' ? sliderRef.current.scrollLeft - scrollAmount : sliderRef.current.scrollLeft + scrollAmount;
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };
  if (flashcards.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center py-12 text-gray-500"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-4xl mb-2"
    }, "\uD83D\uDCDA"), /*#__PURE__*/React.createElement("div", null, "No hay flashcards disponibles")));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `relative ${className}`
  }, props), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M15 19l-7-7 7-7"
    })),
    onClick: () => scroll('left'),
    className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md hover:bg-gray-50",
    size: "large"
  }), /*#__PURE__*/React.createElement("div", {
    ref: sliderRef,
    className: "flex overflow-x-auto gap-6 px-12 py-4 scrollbar-hide h-48",
    style: {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }
  }, flashcards.map(flashcard => /*#__PURE__*/React.createElement(SelectFlashCard, {
    key: flashcard.id,
    flashcard: flashcard,
    selected: selectedIds.includes(flashcard.id),
    onSelect: () => onSelectFlashcard(flashcard.id),
    onEdit: onEditFlashcard,
    onDelete: onDeleteFlashcard,
    canEdit: canEdit,
    canDelete: canDelete,
    className: "flex-shrink-0"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 5l7 7-7 7"
    })),
    onClick: () => scroll('right'),
    className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md hover:bg-gray-50",
    size: "large"
  }), /*#__PURE__*/React.createElement("style", {
    jsx: "true"
  }, `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `));
};

const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-4 ${className}`
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: id
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "text-red-500 ml-1"
  }, "*")), /*#__PURE__*/React.createElement(Input, {
    id: id,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    error: error,
    required: required
  }));
};

const FormGroup = ({
  children,
  onSubmit,
  submitText = 'Enviar',
  loading = false
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "group-formt"
  }, children, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    disabled: loading,
    className: "ml-2"
  }, loading ? 'Procesando...' : submitText));
};

const GameCard = ({
  children,
  isBack = false,
  className = '',
  onTouchStart,
  onTouchEnd,
  slideDirection,
  showAnswer,
  ...props
}) => {
  const baseClasses = isBack ? "card-face card-back bg-white transform rotate-y-180" : "card-face card-front bg-[#195b81] text-white";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `${baseClasses} p-10 rounded-[20px] ${className}`,
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd
  }, props), children);
};

const GameProgressBar = ({
  currentIndex,
  totalCards,
  correctCount,
  className = ''
}) => {
  const progress = (currentIndex + 1) / totalCards * 100;
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-6 ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    size: "small"
  }, "Progreso: ", currentIndex + 1, " de ", totalCards), /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    size: "small"
  }, "Correctas: ", correctCount)), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-200 rounded-full h-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-indigo-600 h-2 rounded-full transition-all duration-300",
    style: {
      width: `${progress}%`
    }
  })));
};

const ImagePreview = ({
  src,
  onRemove,
  className = '',
  alt = 'Preview'
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  React.useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [src]);
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };
  if (!src) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: `relative inline-block ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50"
  }, !imageLoaded && !imageError && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-spin rounded-full h-6 w-6 border-b-2 border-tema1"
  })), imageError && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center p-2"
  }, "Error al cargar imagen"), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    className: `w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`,
    onLoad: handleImageLoad,
    onError: handleImageError
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    className: "absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg",
    title: "Eliminar imagen"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3 h-3",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))));
};

const ImageUploadField = ({
  id,
  label,
  urlValue = '',
  fileValue = null,
  onUrlChange,
  onFileChange,
  onClear,
  error,
  disabled = false,
  className = ''
}) => {
  const [localUrlValue, setLocalUrlValue] = React.useState(urlValue);
  const [urlError, setUrlError] = React.useState('');
  const [isValidatingUrl, setIsValidatingUrl] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState('');
  const [previewType, setPreviewType] = React.useState('');

  // Sincronizar con prop externa
  React.useEffect(() => {
    setLocalUrlValue(urlValue);
  }, [urlValue]);

  // Solo manejar preview para archivos
  React.useEffect(() => {
    if (fileValue) {
      const fileUrl = URL.createObjectURL(fileValue);
      setPreviewSrc(fileUrl);
      setPreviewType('file');
      return () => URL.revokeObjectURL(fileUrl);
    } else if (!localUrlValue) {
      // Si no hay archivo y no hay URL, limpiar preview
      setPreviewSrc('');
      setPreviewType('');
    }
  }, [fileValue, localUrlValue]);

  // Función para validar si una cadena es una URL válida
  const isValidUrl = string => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Manejar cambio local (solo actualizar estado local)
  const handleUrlChange = e => {
    if (disabled) return;
    const newValue = e.target.value;
    setLocalUrlValue(newValue);

    // Limpiar errores mientras escribe
    if (urlError) {
      setUrlError('');
    }

    // Si se vacía, notificar inmediatamente y limpiar preview
    if (!newValue.trim()) {
      onUrlChange('');
      setPreviewSrc('');
      setPreviewType('');
    }
  };

  // Manejar cuando el input pierde el foco
  // Manejar cuando el input pierde el foco
  const handleUrlBlur = async () => {
    if (disabled) return;
    const trimmedValue = localUrlValue.trim();
    if (trimmedValue === '') {
      // Si está vacío, no mostrar error ni previsualización
      setUrlError('');
      setPreviewSrc('');
      setPreviewType('');
      onUrlChange('');
      return;
    }
    if (!isValidUrl(trimmedValue)) {
      // Si no es URL válida, mostrar error
      setUrlError('La URL no es válida');
      setPreviewSrc('');
      setPreviewType('');
      onUrlChange('');
      return;
    }

    // Verificar si parece ser una URL de imagen por extensión
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i;
    const looksLikeImage = imageExtensions.test(trimmedValue);
    if (looksLikeImage) {
      // Si parece una imagen, intentar cargarla pero ser más permisivo
      setIsValidatingUrl(true);
      setUrlError('');
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const imageExists = await new Promise(resolve => {
          img.onload = () => resolve(true);
          img.onerror = () => {
            // Si falla por CORS, asumir que la imagen existe
            // porque la URL tiene extensión de imagen válida
            resolve(true);
          };
          img.src = trimmedValue;

          // Timeout más corto - 3 segundos
          setTimeout(() => resolve(true), 3000); // ← Asumir que existe si tarda mucho
        });

        // Si llegamos aquí, mostrar la imagen
        setUrlError('');
        setPreviewSrc(trimmedValue);
        setPreviewType('url');
        onUrlChange(trimmedValue);
      } catch (error) {
        // Incluso si hay error, si parece imagen, permitirla
        setUrlError('');
        setPreviewSrc(trimmedValue);
        setPreviewType('url');
        onUrlChange(trimmedValue);
      } finally {
        setIsValidatingUrl(false);
      }
    } else {
      // Si no parece una imagen, intentar validación más estricta
      setIsValidatingUrl(true);
      setUrlError('');
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const imageExists = await new Promise(resolve => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = trimmedValue;

          // Timeout de 5 segundos para URLs sin extensión
          setTimeout(() => resolve(false), 5000);
        });
        if (imageExists) {
          setUrlError('');
          setPreviewSrc(trimmedValue);
          setPreviewType('url');
          onUrlChange(trimmedValue);
        } else {
          setUrlError('La URL no contiene una imagen válida o no es accesible');
          setPreviewSrc('');
          setPreviewType('');
          onUrlChange('');
        }
      } catch (error) {
        setUrlError('Error al validar la URL');
        setPreviewSrc('');
        setPreviewType('');
        onUrlChange('');
      } finally {
        setIsValidatingUrl(false);
      }
    }
  };
  const handleFileChange = e => {
    if (disabled) return;
    const file = e.target.files[0];
    onFileChange(file);

    // Si se selecciona archivo, limpiar URL
    if (file) {
      setLocalUrlValue('');
      setUrlError('');
    }
  };
  const handleRemoveImage = () => {
    if (disabled) return;
    setPreviewSrc('');
    setPreviewType('');
    setLocalUrlValue('');
    setUrlError('');
    onClear();
  };
  const hasImage = previewSrc && (fileValue || previewType === 'url');
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-4 ${className}`
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: id
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 space-y-3"
  }, hasImage && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement(ImagePreview, {
    src: previewSrc,
    onRemove: handleRemoveImage,
    alt: `Preview ${label}`
  })), !hasImage && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    id: `${id}_url`,
    type: "url",
    value: localUrlValue,
    onChange: handleUrlChange,
    onBlur: handleUrlBlur // ← Validar solo en blur
    ,
    placeholder: "URL de la imagen (opcional)",
    className: "w-full",
    disabled: disabled,
    error: urlError
  }), isValidatingUrl && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center text-xs text-blue-600 mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-spin h-3 w-3 border border-blue-600 border-t-transparent rounded-full mr-2"
  }), "Validando URL..."), urlError && /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-red-500 mt-1"
  }, urlError)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 border-t border-gray-300"
  }), /*#__PURE__*/React.createElement("span", {
    className: "px-3 text-sm text-gray-500 bg-white"
  }, "o"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 border-t border-gray-300"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FileInput, {
    id: `${id}_file`,
    onChange: handleFileChange,
    accept: "image/*",
    className: "w-full",
    disabled: disabled
  }))), hasImage && /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-500 text-center"
  }, previewType === 'url' ? '📎 Imagen desde URL' : '📁 Archivo subido')), error && /*#__PURE__*/React.createElement("span", {
    className: "text-red-500 text-sm mt-1 block"
  }, error));
};

const NavigationMenu = ({
  menuItems = []
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"
  }, menuItems.map((item, index) => /*#__PURE__*/React.createElement(NavLink, {
    key: index,
    href: item.route,
    active: item.active
  }, item.name, item.need_premium && /*#__PURE__*/React.createElement("span", {
    className: "ml-1 inline-block bg-yellow-400 text-xs text-white px-1 rounded"
  }, "PRO"))));
};

const PageHeader = ({
  title,
  icon
}) => {
  return /*#__PURE__*/React.createElement("header", {
    className: "bg-white shadow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    className: "mr-2"
  }), /*#__PURE__*/React.createElement(Title, null, title))));
};

const PercentageCard = ({
  percentage,
  className = '',
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 text-center ${className}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold text-indigo-600 mb-2"
  }, percentage, "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg text-indigo-700 font-medium"
  }, "Porcentaje de acierto"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 w-full bg-gray-200 rounded-full h-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out",
    style: {
      width: `${percentage}%`
    }
  })));
};

const ResultCard = ({
  value,
  label,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    correct: "text-center bg-green-50 rounded-lg p-4",
    incorrect: "text-center bg-red-50 rounded-lg p-4",
    total: "text-center bg-blue-50 rounded-lg p-4",
    default: "text-center bg-gray-50 rounded-lg p-4"
  };
  const textColors = {
    correct: "text-green-600",
    incorrect: "text-red-600",
    total: "text-blue-600",
    default: "text-gray-600"
  };
  const labelColors = {
    correct: "text-green-700",
    incorrect: "text-red-700",
    total: "text-blue-700",
    default: "text-gray-700"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `${variants[variant]} ${className}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: `text-2xl font-bold ${textColors[variant]}`
  }, value), /*#__PURE__*/React.createElement("div", {
    className: `text-sm ${labelColors[variant]}`
  }, label));
};

const SearchBar = ({
  searchValue,
  onSearchChange,
  onClearSearch,
  selectedCount = 0,
  totalCount = 0,
  placeholder = 'Buscar flashcards...',
  className = '',
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg ${className}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 max-w-md"
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: searchValue,
    onChange: onSearchChange,
    onClear: onClearSearch,
    placeholder: placeholder
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, selectedCount > 0 && /*#__PURE__*/React.createElement(Badge, {
    variant: "primary",
    size: "medium"
  }, selectedCount, " seleccionada", selectedCount !== 1 ? 's' : ''), /*#__PURE__*/React.createElement(Badge, {
    variant: "default",
    size: "medium"
  }, totalCount, " total", totalCount !== 1 ? 'es' : '')));
};

const TabBar = ({
  tabs = [],
  activeTab,
  onTabChange,
  showCounts = false,
  className = '',
  ...props
}) => {
  const tabSliderRef = React.useRef(null);
  const scrollTabs = direction => {
    if (tabSliderRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' ? tabSliderRef.current.scrollLeft - scrollAmount : tabSliderRef.current.scrollLeft + scrollAmount;
      tabSliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `border-b border-gray-200 relative ${className}`
  }, props), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M15 19l-7-7 7-7"
    })),
    onClick: () => scrollTabs('left'),
    className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md hover:bg-gray-50",
    size: "medium"
  }), /*#__PURE__*/React.createElement("div", {
    ref: tabSliderRef,
    className: "flex overflow-x-auto scrollbar-hide px-10",
    style: {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    className: "-mb-px flex space-x-2 min-w-max"
  }, tabs.map(tab => /*#__PURE__*/React.createElement("div", {
    key: tab.id // ← AGREGAR KEY
    ,
    className: "flex items-center flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Tab, {
    active: activeTab === tab.id,
    onClick: () => onTabChange(tab.id),
    disabled: tab.disabled,
    className: "flex items-center gap-2"
  }, showCounts && tab.count !== undefined && /*#__PURE__*/React.createElement(Badge, {
    variant: activeTab === tab.id ? 'primary' : 'default',
    size: "small"
  }, tab.count), tab.name))))), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 5l7 7-7 7"
    })),
    onClick: () => scrollTabs('right'),
    className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md hover:bg-gray-50",
    size: "medium"
  }), /*#__PURE__*/React.createElement("style", {
    jsx: "true"
  }, `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `));
};

const TeamDropdown$1 = ({
  currentTeam,
  teams = [],
  onTeamSwitch
}) => {
  // Siempre mostrar el dropdown, incluso si no hay teams
  const displayTeam = currentTeam?.name || 'Medicina';
  const trigger = /*#__PURE__*/React.createElement("span", {
    className: "inline-flex rounded-md"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
  }, displayTeam, /*#__PURE__*/React.createElement("svg", {
    className: "ml-2 -mr-0.5 h-4 w-4",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
  }))));
  return /*#__PURE__*/React.createElement(Dropdown, {
    trigger: trigger,
    align: "right",
    width: "48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block px-4 py-2 text-xs text-gray-400"
  }, "Selecciona Materia"), teams.length > 0 ? teams.map(team => /*#__PURE__*/React.createElement("button", {
    key: team.id,
    onClick: () => onTeamSwitch(team.id),
    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  }, team.name)) : /*#__PURE__*/React.createElement("div", {
    className: "block px-4 py-2 text-sm text-gray-700"
  }, "No hay materias disponibles"));
};

const TextAreaField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  showAIButton = false,
  onAIGenerate,
  aiLoading = false,
  aiAnimating = false,
  // ← Nuevo prop
  aiDisabled = false,
  disabled = false,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = React.useState(value);

  // Manejar animación cuando aiAnimating cambie
  React.useEffect(() => {
    if (aiAnimating && value !== displayValue) {
      animateText(displayValue, value);
    } else {
      setDisplayValue(value);
    }
  }, [value, aiAnimating]);
  const animateText = async (fromText, toText) => {
    const startLength = fromText.length;
    const endLength = toText.length;
    const speed = 25;
    for (let i = startLength; i <= endLength; i++) {
      await new Promise(resolve => setTimeout(resolve, speed));
      setDisplayValue(toText.substring(0, i));
    }
  };
  const handleChange = e => {
    if (!aiAnimating && !disabled) {
      const newValue = e.target.value;
      setDisplayValue(newValue);
      onChange(e);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-4 relative ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: id
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "text-red-500 ml-1"
  }, "*")), showAIButton && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: onAIGenerate,
    disabled: aiLoading || aiDisabled || aiAnimating,
    className: `relative h-10 flex transition duration-300 px-[20px] py-[3px] rounded-[8px] justify-center items-center gap-[8px] text-white font-semibold text-[12px] ${aiLoading || aiDisabled || aiAnimating ? 'bg-gray-400 cursor-not-allowed' : 'bg-tema1 hover:bg-tema3'}`
  }, aiLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
  }), /*#__PURE__*/React.createElement("span", null, "Generando...")) : aiAnimating ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u2728"), /*#__PURE__*/React.createElement("span", null, "Escribiendo...")) : aiDisabled ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u23F3"), /*#__PURE__*/React.createElement("span", null, "Esperando...")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("span", null, "Generar por IA")))), /*#__PURE__*/React.createElement(TextArea, {
    id: id,
    value: displayValue,
    onChange: handleChange,
    placeholder: placeholder,
    error: error,
    required: required,
    rows: 3,
    disabled: disabled || aiAnimating,
    className: aiAnimating ? 'bg-blue-50 border-blue-300' : ''
  }), aiAnimating && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center mt-1 text-sm text-blue-600"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"
  }), "\u2728 Escribiendo texto generado por IA..."));
};

const UserDropdown$1 = ({
  user,
  onLogout
}) => {
  const trigger = /*#__PURE__*/React.createElement("span", {
    className: "inline-flex rounded-md"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2"
  }, user?.profile_photo_url ? /*#__PURE__*/React.createElement("img", {
    className: "h-8 w-8 rounded-full object-cover",
    src: user.profile_photo_url,
    alt: user.name
  }) : /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700"
  }, user?.name?.charAt(0)?.toUpperCase() || 'U')), user?.name || 'Usuario', /*#__PURE__*/React.createElement("svg", {
    className: "ml-2 -mr-0.5 h-4 w-4",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
  }))));
  return /*#__PURE__*/React.createElement(Dropdown, {
    trigger: trigger,
    align: "right",
    width: "48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3"
  }, user?.profile_photo_url ? /*#__PURE__*/React.createElement("img", {
    className: "h-10 w-10 rounded-full object-cover",
    src: user.profile_photo_url,
    alt: user.name
  }) : /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-medium text-gray-700"
  }, user?.name?.charAt(0)?.toUpperCase() || 'U')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-medium text-gray-900"
  }, user?.name), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-500"
  }, user?.email)))), /*#__PURE__*/React.createElement("div", {
    className: "py-1"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/profile",
    className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  }, "Perfil"), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  }, "Cerrar Sesi\xF3n")));
};

const useApi = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Configuración base de axios
  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // Interceptor para agregar el token automáticamente
  apiClient.interceptors.request.use(config => {
    const tokenKey = process.env.REACT_APP_TOKEN_STORAGE_KEY;
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Interceptor para manejar errores de autenticación
  apiClient.interceptors.response.use(response => response, error => {
    if (error.response?.status === 401) {
      const tokenKey = process.env.REACT_APP_TOKEN_STORAGE_KEY;
      const loginUrl = process.env.REACT_APP_LOGIN_URL;
      localStorage.removeItem(tokenKey);
      window.location.href = loginUrl;
    }
    return Promise.reject(error);
  });

  // Función genérica para hacer peticiones
  const makeRequest = React.useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await apiClient.get(url, config);
          break;
        case 'post':
          response = await apiClient.post(url, data, config);
          break;
        case 'put':
          response = await apiClient.put(url, data, config);
          break;
        case 'patch':
          response = await apiClient.patch(url, data, config);
          break;
        case 'delete':
          response = await apiClient.delete(url, config);
          break;
        default:
          throw new Error(`Método HTTP no soportado: ${method}`);
      }
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error en la petición';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        status: err.response?.status
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Métodos específicos para cada tipo de petición
  const get = React.useCallback((url, config = {}) => makeRequest('get', url, null, config), [makeRequest]);
  const post = React.useCallback((url, data, config = {}) => makeRequest('post', url, data, config), [makeRequest]);
  const put = React.useCallback((url, data, config = {}) => makeRequest('put', url, data, config), [makeRequest]);
  const patch = React.useCallback((url, data, config = {}) => makeRequest('patch', url, data, config), [makeRequest]);
  const del = React.useCallback((url, config = {}) => makeRequest('delete', url, null, config), [makeRequest]);
  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    makeRequest
  };
};

const CategoryForm = ({
  onCategoryCreated
}) => {
  const [categoryName, setCategoryName] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState('');
  const api = useApi();
  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    if (!categoryName.trim()) {
      setErrors({
        categoryName: 'El nombre de la categoría es requerido'
      });
      return;
    }
    try {
      const result = await api.post('/api/flashcard/category', {
        nombre: categoryName.trim()
      });
      if (result.success) {
        const newCategory = result.data.data;

        // ✅ VERIFICAR QUE TENGA nombre
        if (newCategory && newCategory.nombre) {
          setSuccessMessage('Categoría creada exitosamente');
          setCategoryName('');
          if (onCategoryCreated) {
            onCategoryCreated(newCategory);
          }
        } else {
          console.error('❌ Estructura de categoría inválida:', newCategory);
          setErrors({
            general: 'Error: estructura de datos inválida'
          });
        }
        return;
      } else {
        if (result.errors) {
          const formattedErrors = {};
          Object.keys(result.errors).forEach(field => {
            formattedErrors[field] = Array.isArray(result.errors[field]) ? result.errors[field][0] : result.errors[field];
          });
          setErrors(formattedErrors);
        } else {
          setErrors({
            general: `Error al crear la categoría`
          });
        }
      }
    } catch (error) {
      console.log('💥 Error en catch:', error);

      // ✅ VERIFICAR SI YA HAY MENSAJE DE ÉXITO
      if (successMessage) {
        console.log('✅ Ignorando error porque ya hay éxito');
        return;
      }

      // ✅ MANEJO MEJORADO DE ERRORES HTTP
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        if (status === 422 && data.errors) {
          // Errores de validación
          const formattedErrors = {};
          Object.keys(data.errors).forEach(field => {
            formattedErrors[field] = Array.isArray(data.errors[field]) ? data.errors[field][0] : data.errors[field];
          });
          setErrors(formattedErrors);
        } else {
          setErrors({
            general: `Error ${status}: ${data.message || 'Error del servidor'}`
          });
        }
      } else {
        setErrors({
          general: 'Error de conexión. Intenta nuevamente.'
        });
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded container-askt"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-semibold mb-4 primary-color title-ask-container"
  }, "Crear Categor\xEDa"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement(Alert, {
    type: "error",
    message: errors.general
  }), /*#__PURE__*/React.createElement(Alert, {
    type: "success",
    message: successMessage
  }), /*#__PURE__*/React.createElement(FormGroup, {
    onSubmit: handleSubmit,
    submitText: "Crear Categor\xEDa",
    loading: api.loading
  }, /*#__PURE__*/React.createElement(FormField, {
    id: "categoryName",
    label: "Nombre de la Categor\xEDa",
    type: "text",
    value: categoryName,
    onChange: e => setCategoryName(e.target.value),
    placeholder: "Ingresa el nombre de la categor\xEDa",
    error: errors.categoryName || errors.nombre // ← CORREGIR: Verificar ambos
    ,
    required: true
  }))));
};

const FlashcardForm = ({
  onFlashcardCreated,
  categories = [],
  className = '',
  ...props
}) => {
  const [formData, setFormData] = React.useState({
    pregunta: '',
    respuesta: '',
    url: '',
    imagen: null,
    url_respuesta: '',
    imagen_respuesta: null,
    selectedCategories: []
  });
  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState('');
  const [aiLoading, setAiLoading] = React.useState({
    pregunta: false,
    respuesta: false
  });
  const [isAnyAiLoading, setIsAnyAiLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [aiAnimating, setAiAnimating] = React.useState({
    pregunta: false,
    respuesta: false
  });
  const api = useApi();

  // Controlar el estado general de IA
  React.useEffect(() => {
    const anyLoading = aiLoading.pregunta || aiLoading.respuesta;
    setIsAnyAiLoading(anyLoading);
  }, [aiLoading.pregunta, aiLoading.respuesta]);

  // ← Nuevo: Estado general de loading (IA o submit)
  const isAnyLoading = isAnyAiLoading || isSubmitting;
  const handleChange = React.useCallback((field, value) => {
    if (isSubmitting) return;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  }, [isSubmitting, errors]); // ← Dependencias específicas

  const handleImageUrlChange = (field, value) => {
    // ← Prevenir cambios si está enviando
    if (isSubmitting) return;
    setFormData(prev => ({
      ...prev,
      [field]: value,
      [field === 'url' ? 'imagen' : 'imagen_respuesta']: value.trim() ? null : prev[field === 'url' ? 'imagen' : 'imagen_respuesta']
    }));
  };
  const handleImageFileChange = (field, file) => {
    // ← Prevenir cambios si está enviando
    if (isSubmitting) return;
    setFormData(prev => ({
      ...prev,
      [field === 'imagen' ? 'imagen' : 'imagen_respuesta']: file,
      [field === 'imagen' ? 'url' : 'url_respuesta']: file ? '' : prev[field === 'imagen' ? 'url' : 'url_respuesta']
    }));
  };
  const handleImageClear = type => {
    // ← Prevenir cambios si está enviando
    if (isSubmitting) return;
    if (type === 'pregunta') {
      setFormData(prev => ({
        ...prev,
        url: '',
        imagen: null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        url_respuesta: '',
        imagen_respuesta: null
      }));
    }
  };
  const handleAIGenerate = async type => {
    if (isAnyLoading) {
      setErrors(prev => ({
        ...prev,
        [`ai_${type}`]: isSubmitting ? 'No se puede generar IA mientras se está creando la flashcard.' : 'Ya hay una generación de IA en proceso. Espera a que termine.'
      }));
      return;
    }
    setAiLoading(prev => ({
      ...prev,
      [type]: true
    }));
    setErrors(prev => ({
      ...prev,
      [`ai_${type}`]: null
    }));
    try {
      let prompt = '';
      if (type === 'pregunta') {
        prompt = formData.respuesta ? `Genera una pregunta de flashcard para esta respuesta: ${formData.respuesta} pero que sea muy breve que es para la pregunta de una Flashcard y su dificultad debe ser a nivel de Medico Universitario.` : `Genera una pregunta de flashcard para una flashcard que sea muy breve que es para la pregunta de una Flashcard tiene que ser de caracter medico y su dificultad debe ser a nivel de Medico Universitario.`;
      } else {
        prompt = formData.pregunta ? `Genera una respuesta breve y clara para esta pregunta: ${formData.pregunta} pero que sea muy breve que es para la respuesta de una Flashcard y su dificultad debe ser a nivel de Medico Universitario.` : `Genera una respuesta educativa para una flashcard que sea muy breve que es para la respuesta de una Flashcard y su dificultad debe ser a nivel de Medico Universitario.`;
      }
      const result = await api.get('/api/flashcard/ai-generate', {
        params: {
          type: type,
          prompt: prompt,
          current_text: formData[type]
        }
      });
      if (result.success) {
        const generatedText = result.data?.data?.generated_text || result.data?.generated_text;
        if (generatedText) {
          // ← Activar animación ANTES de cambiar el valor
          setAiAnimating(prev => ({
            ...prev,
            [type]: true
          }));

          // ← Cambiar el valor directamente
          setFormData(prev => ({
            ...prev,
            [type]: generatedText
          }));

          // ← Desactivar animación después de un tiempo
          setTimeout(() => {
            setAiAnimating(prev => ({
              ...prev,
              [type]: false
            }));
          }, generatedText.length * 25); // 25ms por carácter
        } else {
          setErrors(prev => ({
            ...prev,
            [`ai_${type}`]: 'No se pudo generar el texto'
          }));
        }
      } else {
        setErrors(prev => ({
          ...prev,
          [`ai_${type}`]: result.error || 'Error al generar contenido con IA'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [`ai_${type}`]: 'Error de conexión con el servicio de IA'
      }));
    } finally {
      setAiLoading(prev => ({
        ...prev,
        [type]: false
      }));
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // ← Prevenir envío si hay cualquier loading activo
    if (isAnyLoading) {
      setErrors({
        general: isAnyAiLoading ? 'Espera a que termine la generación de IA antes de enviar el formulario.' : 'Ya se está procesando la flashcard.'
      });
      return;
    }

    // Validación básica del cliente
    const newErrors = {};
    if (!formData.pregunta.trim()) {
      newErrors.pregunta = 'La pregunta es requerida';
    } else if (formData.pregunta.trim().length <= 5) {
      newErrors.pregunta = 'La pregunta debe tener al menos 5 caracteres';
    }
    if (!formData.respuesta.trim()) {
      newErrors.respuesta = 'La respuesta es requerida';
    } else if (formData.respuesta.trim().length <= 2) {
      newErrors.respuesta = 'La respuesta debe tener al menos 2 caracteres';
    }
    if (formData.url.trim() && formData.imagen) {
      newErrors.imagen = 'No puedes subir una imagen y una URL al mismo tiempo para la pregunta';
    }
    if (formData.url_respuesta.trim() && formData.imagen_respuesta) {
      newErrors.imagen_respuesta = 'No puedes subir una imagen y una URL al mismo tiempo para la respuesta';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true); // ← Activar loading

    try {
      const submitData = new FormData();
      submitData.append('pregunta', formData.pregunta.trim());
      submitData.append('respuesta', formData.respuesta.trim());
      submitData.append('url', formData.url.trim());
      submitData.append('url_respuesta', formData.url_respuesta.trim());
      if (formData.imagen) {
        submitData.append('imagen', formData.imagen);
      }
      if (formData.imagen_respuesta) {
        submitData.append('imagen_respuesta', formData.imagen_respuesta);
      }
      if (formData.selectedCategories.length > 0) {
        submitData.append('categorias', JSON.stringify(formData.selectedCategories));
      }
      const result = await api.post('/api/flashcard', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // En FlashcardForm.jsx, en el handleSubmit:
      if (result.success) {
        console.log('✅ Respuesta completa flashcard:', result);

        // ✅ EXTRAER LA FLASHCARD CORRECTAMENTE
        const newFlashcard = result.data.data || result.data.flashcard || result.data;
        console.log('✅ Flashcard extraída:', newFlashcard);
        setSuccessMessage('Flashcard creada exitosamente');
        setFormData({
          pregunta: '',
          respuesta: '',
          url: '',
          imagen: null,
          url_respuesta: '',
          imagen_respuesta: null,
          selectedCategories: []
        });
        if (onFlashcardCreated && newFlashcard && newFlashcard.id) {
          console.log('📤 Enviando flashcard al padre:', newFlashcard);
          onFlashcardCreated(newFlashcard);
        } else {
          console.error('❌ No se pudo extraer la flashcard válida:', newFlashcard);
        }
      } else {
        if (result.status === 422 && result.errors) {
          const serverErrors = {};
          Object.keys(result.errors).forEach(field => {
            serverErrors[field] = Array.isArray(result.errors[field]) ? result.errors[field][0] : result.errors[field];
          });
          setErrors(serverErrors);
        } else {
          setErrors({
            general: result.error || 'Error al crear la flashcard'
          });
        }
      }
    } catch (error) {
      setErrors({
        general: 'Error de conexión. Intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false); // ← Desactivar loading
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FullScreenLoader, {
    show: isSubmitting,
    message: "Creando flashcard...",
    subMessage: "Por favor espera, estamos procesando tu flashcard"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded container-askt"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold mb-4 primary-color title-ask-container"
  }, "Crear Flashcard"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "form-container-ask mt-4"
  }, /*#__PURE__*/React.createElement(Alert, {
    type: "error",
    message: errors.general
  }), /*#__PURE__*/React.createElement(Alert, {
    type: "success",
    message: successMessage
  }), isAnyAiLoading && !isSubmitting && /*#__PURE__*/React.createElement(Alert, {
    type: "info",
    message: "\uD83E\uDD16 Generando contenido con IA... Por favor espera antes de usar otros botones.",
    className: "mb-4"
  }), /*#__PURE__*/React.createElement(TextAreaField, {
    id: "pregunta",
    label: "Pregunta",
    value: formData.pregunta,
    onChange: e => handleChange('pregunta', e.target.value),
    placeholder: "Ingresa la pregunta",
    error: errors.pregunta,
    required: true,
    showAIButton: true,
    onAIGenerate: () => handleAIGenerate('pregunta'),
    aiLoading: aiLoading.pregunta,
    aiDisabled: isAnyLoading && !aiLoading.pregunta,
    disabled: isSubmitting,
    animated: true,
    aiAnimating: aiAnimating.pregunta
  }), errors.ai_pregunta && /*#__PURE__*/React.createElement(Alert, {
    type: "error",
    message: errors.ai_pregunta,
    className: "mb-4"
  }), /*#__PURE__*/React.createElement(TextAreaField, {
    id: "respuesta",
    label: "Respuesta",
    value: formData.respuesta,
    onChange: e => handleChange('respuesta', e.target.value),
    placeholder: "Ingresa la respuesta",
    error: errors.respuesta,
    required: true,
    showAIButton: true,
    onAIGenerate: () => handleAIGenerate('respuesta'),
    aiLoading: aiLoading.respuesta,
    aiDisabled: isAnyLoading && !aiLoading.respuesta,
    disabled: isSubmitting,
    animated: true,
    aiAnimating: aiAnimating.respuesta
  }), errors.ai_respuesta && /*#__PURE__*/React.createElement(Alert, {
    type: "error",
    message: errors.ai_respuesta,
    className: "mb-4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
  }, /*#__PURE__*/React.createElement(ImageUploadField, {
    id: "imagen_pregunta",
    label: "Imagen de Pregunta",
    urlValue: formData.url,
    fileValue: formData.imagen,
    onUrlChange: value => handleImageUrlChange('url', value),
    onFileChange: file => handleImageFileChange('imagen', file),
    onClear: () => handleImageClear('pregunta'),
    error: errors.imagen || errors.url,
    disabled: isSubmitting
  }), /*#__PURE__*/React.createElement(ImageUploadField, {
    id: "imagen_respuesta",
    label: "Imagen de Respuesta",
    urlValue: formData.url_respuesta,
    fileValue: formData.imagen_respuesta,
    onUrlChange: value => handleImageUrlChange('url_respuesta', value),
    onFileChange: file => handleImageFileChange('imagen_respuesta', file),
    onClear: () => handleImageClear('respuesta'),
    error: errors.imagen_respuesta || errors.url_respuesta,
    disabled: isSubmitting
  })), /*#__PURE__*/React.createElement(CategorySelector, {
    categories: categories,
    selectedCategories: formData.selectedCategories,
    onChange: selected => handleChange('selectedCategories', selected)
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    disabled: isAnyLoading,
    className: "boton-success-m w-full md:w-auto"
  }, isSubmitting ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    className: "animate-spin -ml-1 mr-2 h-4 w-4",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 814 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), "Creando...") : isAnyAiLoading ? 'Esperando IA...' : 'Crear Flashcard'))));
};

const FlashcardList = ({
  flashcards = [],
  categories = [],
  activeTabOverride,
  onStartGame,
  onCreateFlashcard,
  onCreateCategory,
  onEditFlashcard,
  onDeleteFlashcard,
  canEdit = false,
  canDelete = false,
  className = '',
  ...props
}) => {
  const [activeTab, setActiveTab] = React.useState('sin-categoria');
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [searchValues, setSearchValues] = React.useState({});
  const [gameLoading, setGameLoading] = React.useState(false); // ← AGREGAR loading state

  const api = useApi();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
      // Reset después de un momento para permitir cambios manuales
      setTimeout(() => {
        // No resetear aquí, dejar que el padre lo maneje
      }, 1000);
    }
  }, [activeTabOverride]);
  const tabs = React.useMemo(() => {
    // ✅ FILTRAR CATEGORÍAS VÁLIDAS
    const validCategories = categories.filter(category => category && category.id !== undefined && category.nombre !== undefined);
    const sinCategoriaCount = flashcards.filter(f => !f.category || f.category === 'Sin Categoría').length;
    const baseTabs = [{
      id: 'sin-categoria',
      name: 'Sin Categoría',
      count: sinCategoriaCount
    }];
    const categoryTabs = validCategories.map(category => ({
      id: category.id,
      name: category.nombre,
      count: flashcards.filter(f => f.category === category.nombre).length
    }));
    return [...baseTabs, ...categoryTabs];
  }, [flashcards, categories]);
  const filteredFlashcards = React.useMemo(() => {
    let filtered = flashcards;

    // Filtrar por categoría
    if (activeTab === 'sin-categoria') {
      filtered = flashcards.filter(f => !f.category || f.category === 'Sin Categoría');
    } else {
      const activeCategory = categories.find(c => c.id === activeTab);
      if (activeCategory) {
        filtered = flashcards.filter(f => f.category === activeCategory.nombre);
      }
    }

    // Filtrar por búsqueda
    const searchValue = searchValues[activeTab] || '';
    if (searchValue.trim()) {
      filtered = filtered.filter(f => f.pregunta.toLowerCase().includes(searchValue.toLowerCase()) || f.respuesta.toLowerCase().includes(searchValue.toLowerCase()));
    }
    return filtered;
  }, [flashcards, categories, activeTab, searchValues]);
  const allUniqueIds = React.useMemo(() => {
    return [...new Set(flashcards.map(f => f.id))];
  }, [flashcards]);
  const categoryUniqueIds = React.useMemo(() => {
    return [...new Set(filteredFlashcards.map(f => f.id))];
  }, [filteredFlashcards]);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };
  const handleSearchChange = e => {
    setSearchValues(prev => ({
      ...prev,
      [activeTab]: e.target.value
    }));
  };
  const handleClearSearch = () => {
    setSearchValues(prev => ({
      ...prev,
      [activeTab]: ''
    }));
  };
  const handleSelectFlashcard = flashcardId => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(flashcardId)) {
        newSet.delete(flashcardId);
      } else {
        newSet.add(flashcardId);
      }
      return Array.from(newSet);
    });
  };
  const handleSelectAll = () => {
    setSelectedIds(prev => {
      const currentSet = new Set(prev);
      allUniqueIds.forEach(id => currentSet.add(id));
      return Array.from(currentSet);
    });
  };
  const handleDeselectAll = () => {
    setSelectedIds([]);
  };
  const handleSelectCategory = () => {
    setSelectedIds(prev => {
      const currentSet = new Set(prev);
      categoryUniqueIds.forEach(id => currentSet.add(id));
      return Array.from(currentSet);
    });
  };
  const handleDeselectCategory = () => {
    setSelectedIds(prev => {
      const categorySet = new Set(categoryUniqueIds);
      return prev.filter(id => !categorySet.has(id));
    });
  };
  const selectedInCategory = selectedIds.filter(id => categoryUniqueIds.includes(id)).length;
  const allSelected = selectedIds.length === allUniqueIds.length && allUniqueIds.length > 0;
  const categoryAllSelected = selectedInCategory === categoryUniqueIds.length && categoryUniqueIds.length > 0;
  const handleStartGame = async () => {
    if (selectedIds.length === 0) {
      console.error('❌ No hay flashcards seleccionadas');
      return;
    }
    setGameLoading(true);
    try {
      const result = await api.post('/api/flashcard/start-game', {
        flashcard_ids: selectedIds,
        total_selected: selectedIds.length
      });
      console.log('✅ Respuesta del juego:', result);
      if (result.success) {
        console.log('🎮 Juego iniciado exitosamente:', result.data);
        if (onStartGame) {
          onStartGame(result.data);
        }
        navigate('/game');
      } else {
        console.error('❌ Error al iniciar juego:', result.error);
        // alert('Error al iniciar el juego: ' + result.error);
      }
    } catch (error) {
      console.error('💥 Error de conexión al iniciar juego:', error);
      // alert('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setGameLoading(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `bg-white rounded-lg shadow-sm border border-gray-200 ${className}`
  }, props), /*#__PURE__*/React.createElement(TabBar, {
    tabs: tabs,
    activeTab: activeTab,
    onTabChange: handleTabChange,
    showCounts: true,
    className: "px-6 pt-6"
  }), /*#__PURE__*/React.createElement(SearchBar, {
    searchValue: searchValues[activeTab] || '',
    onSearchChange: handleSearchChange,
    onClearSearch: handleClearSearch,
    selectedCount: selectedInCategory,
    totalCount: categoryUniqueIds.length,
    placeholder: `Buscar en ${tabs.find(t => t.id === activeTab)?.name || 'esta categoría'}...`,
    className: "mx-6 my-4"
  }), /*#__PURE__*/React.createElement(FlashcardSlider, {
    flashcards: filteredFlashcards,
    selectedIds: selectedIds,
    onSelectFlashcard: handleSelectFlashcard,
    onEditFlashcard: onEditFlashcard,
    onDeleteFlashcard: onDeleteFlashcard,
    canEdit: canEdit,
    canDelete: canDelete,
    className: "h-48"
  }), /*#__PURE__*/React.createElement(ActionButtons, {
    selectedCount: selectedIds.length,
    totalCount: allUniqueIds.length,
    categorySelectedCount: selectedInCategory,
    categoryTotalCount: categoryUniqueIds.length,
    allSelected: allSelected,
    categoryAllSelected: categoryAllSelected,
    onStartGame: handleStartGame,
    onSelectAll: handleSelectAll,
    onDeselectAll: handleDeselectAll,
    onSelectCategory: handleSelectCategory,
    onDeselectCategory: handleDeselectCategory,
    onCreateFlashcard: onCreateFlashcard,
    onCreateCategory: onCreateCategory
  }));
};

const GameContainer = ({
  children,
  className = '',
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `max-w-xl mx-auto p-6 container-full ${className}`
  }, props), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold mb-6 text-indigo-700 primary-color title-ask-container"
  }, "Juego de Flashcards"), /*#__PURE__*/React.createElement("hr", {
    className: "mb-6"
  }), children);
};

const MainContent = ({
  children
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "py-12"
  }, /*#__PURE__*/React.createElement(Container, {
    className: "main-chat-bot"
  }, /*#__PURE__*/React.createElement(ContentBox, {
    className: "box-chat"
  }, children)));
};

const Navigation = ({
  user,
  menuItems = [],
  teams = [],
  currentTeam,
  onLogout,
  onTeamSwitch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("nav", {
    className: "bg-white border-b border-gray-100 sticky top-0 z-[99]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between h-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shrink-0 flex items-center mr-24 pr-24"
  }, /*#__PURE__*/React.createElement("a", {
    href: process.env.REACT_APP_API_BASE_URL
  }, /*#__PURE__*/React.createElement("img", {
    src: "/logo.png",
    alt: "MBS - Med By Students",
    className: "block h-9"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hidden space-x-8 sm:flex items-center flex-1 justify-center"
  }, menuItems.map((item, index) => /*#__PURE__*/React.createElement("a", {
    key: index,
    href: item.url,
    className: `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${item.active ? 'border-indigo-400 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
  }, item.name, item.need_premium && /*#__PURE__*/React.createElement("span", {
    className: "ml-1 inline-block bg-yellow-400 text-xs text-white px-1 rounded"
  }, "PRO")))), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex sm:items-center sm:ml-6 space-x-3"
  }, /*#__PURE__*/React.createElement(TeamDropdown, {
    currentTeam: currentTeam,
    teams: teams,
    onTeamSwitch: onTeamSwitch
  }), /*#__PURE__*/React.createElement(UserDropdown, {
    user: user,
    onLogout: onLogout
  })))));
};

// Componentes de dropdown actualizados
const TeamDropdown = ({
  currentTeam,
  teams = [],
  onTeamSwitch
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const displayTeam = currentTeam?.name || 'Medicina';
  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsOpen(!isOpen),
    className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
  }, displayTeam, /*#__PURE__*/React.createElement("svg", {
    className: "ml-2 -mr-0.5 h-4 w-4",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "py-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block px-4 py-2 text-xs text-gray-400"
  }, "Selecciona Materia"), teams.length > 0 ? teams.map(team => /*#__PURE__*/React.createElement("button", {
    key: team.id,
    onClick: () => {
      onTeamSwitch(team.id);
      setIsOpen(false);
    },
    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  }, team.name)) : /*#__PURE__*/React.createElement("div", {
    className: "block px-4 py-2 text-sm text-gray-700"
  }, "No hay materias"))));
};
const UserDropdown = ({
  user,
  onLogout
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsOpen(!isOpen),
    className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2"
  }, user?.profile_photo_url ? /*#__PURE__*/React.createElement("img", {
    className: "h-8 w-8 rounded-full object-cover",
    src: user.profile_photo_url,
    alt: user.name
  }) : /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700"
  }, user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block px-4 py-2 text-xs text-gray-400"
  }, "administrar cuenta"), /*#__PURE__*/React.createElement("div", {
    className: "py-1"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/profile",
    className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  }, "Perfil"), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-200"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onLogout();
      setIsOpen(false);
    },
    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  }, "Cerrar Sesi\xF3n"))));
};

/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) {
      _defineProperty$1(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

const noop = () => {};
let _WINDOW = {};
let _DOCUMENT = {};
let _MUTATION_OBSERVER = null;
let _PERFORMANCE = {
  mark: noop,
  measure: noop
};
try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}
const {
  userAgent = ''
} = _WINDOW.navigator || {};
const WINDOW = _WINDOW;
const DOCUMENT = _DOCUMENT;
const MUTATION_OBSERVER = _MUTATION_OBSERVER;
const PERFORMANCE = _PERFORMANCE;
!!WINDOW.document;
const IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
const IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

var p = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,
  g = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
var S = {
    classic: {
      fa: "solid",
      fas: "solid",
      "fa-solid": "solid",
      far: "regular",
      "fa-regular": "regular",
      fal: "light",
      "fa-light": "light",
      fat: "thin",
      "fa-thin": "thin",
      fab: "brands",
      "fa-brands": "brands"
    },
    duotone: {
      fa: "solid",
      fad: "solid",
      "fa-solid": "solid",
      "fa-duotone": "solid",
      fadr: "regular",
      "fa-regular": "regular",
      fadl: "light",
      "fa-light": "light",
      fadt: "thin",
      "fa-thin": "thin"
    },
    sharp: {
      fa: "solid",
      fass: "solid",
      "fa-solid": "solid",
      fasr: "regular",
      "fa-regular": "regular",
      fasl: "light",
      "fa-light": "light",
      fast: "thin",
      "fa-thin": "thin"
    },
    "sharp-duotone": {
      fa: "solid",
      fasds: "solid",
      "fa-solid": "solid",
      fasdr: "regular",
      "fa-regular": "regular",
      fasdl: "light",
      "fa-light": "light",
      fasdt: "thin",
      "fa-thin": "thin"
    }
  },
  A = {
    GROUP: "duotone-group",
    PRIMARY: "primary",
    SECONDARY: "secondary"
  },
  P = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"];
var s = "classic",
  t = "duotone",
  r = "sharp",
  o = "sharp-duotone",
  L = [s, t, r, o];
var G = {
    classic: {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal",
      100: "fat"
    },
    duotone: {
      900: "fad",
      400: "fadr",
      300: "fadl",
      100: "fadt"
    },
    sharp: {
      900: "fass",
      400: "fasr",
      300: "fasl",
      100: "fast"
    },
    "sharp-duotone": {
      900: "fasds",
      400: "fasdr",
      300: "fasdl",
      100: "fasdt"
    }
  };
var lt = {
    "Font Awesome 6 Free": {
      900: "fas",
      400: "far"
    },
    "Font Awesome 6 Pro": {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal",
      100: "fat"
    },
    "Font Awesome 6 Brands": {
      400: "fab",
      normal: "fab"
    },
    "Font Awesome 6 Duotone": {
      900: "fad",
      400: "fadr",
      normal: "fadr",
      300: "fadl",
      100: "fadt"
    },
    "Font Awesome 6 Sharp": {
      900: "fass",
      400: "fasr",
      normal: "fasr",
      300: "fasl",
      100: "fast"
    },
    "Font Awesome 6 Sharp Duotone": {
      900: "fasds",
      400: "fasdr",
      normal: "fasdr",
      300: "fasdl",
      100: "fasdt"
    }
  };
var pt = new Map([["classic", {
    defaultShortPrefixId: "fas",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin", "brands"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["sharp", {
    defaultShortPrefixId: "fass",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["duotone", {
    defaultShortPrefixId: "fad",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["sharp-duotone", {
    defaultShortPrefixId: "fasds",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }]]),
  xt = {
    classic: {
      solid: "fas",
      regular: "far",
      light: "fal",
      thin: "fat",
      brands: "fab"
    },
    duotone: {
      solid: "fad",
      regular: "fadr",
      light: "fadl",
      thin: "fadt"
    },
    sharp: {
      solid: "fass",
      regular: "fasr",
      light: "fasl",
      thin: "fast"
    },
    "sharp-duotone": {
      solid: "fasds",
      regular: "fasdr",
      light: "fasdl",
      thin: "fasdt"
    }
  };
var Ft = ["fak", "fa-kit", "fakd", "fa-kit-duotone"],
  St = {
    kit: {
      fak: "kit",
      "fa-kit": "kit"
    },
    "kit-duotone": {
      fakd: "kit-duotone",
      "fa-kit-duotone": "kit-duotone"
    }
  },
  At = ["kit"];
var Ct = {
  kit: {
    "fa-kit": "fak"
  }};
var Lt = ["fak", "fakd"],
  Wt = {
    kit: {
      fak: "fa-kit"
    }};
var Et = {
    kit: {
      kit: "fak"
    },
    "kit-duotone": {
      "kit-duotone": "fakd"
    }
  };

var t$1 = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
  },
  r$1 = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"];
var bt$1 = ["fak", "fa-kit", "fakd", "fa-kit-duotone"];
var Yt = {
    "Font Awesome Kit": {
      400: "fak",
      normal: "fak"
    },
    "Font Awesome Kit Duotone": {
      400: "fakd",
      normal: "fakd"
    }
  };
var ua = {
    classic: {
      "fa-brands": "fab",
      "fa-duotone": "fad",
      "fa-light": "fal",
      "fa-regular": "far",
      "fa-solid": "fas",
      "fa-thin": "fat"
    },
    duotone: {
      "fa-regular": "fadr",
      "fa-light": "fadl",
      "fa-thin": "fadt"
    },
    sharp: {
      "fa-solid": "fass",
      "fa-regular": "fasr",
      "fa-light": "fasl",
      "fa-thin": "fast"
    },
    "sharp-duotone": {
      "fa-solid": "fasds",
      "fa-regular": "fasdr",
      "fa-light": "fasdl",
      "fa-thin": "fasdt"
    }
  },
  I$1 = {
    classic: ["fas", "far", "fal", "fat", "fad"],
    duotone: ["fadr", "fadl", "fadt"],
    sharp: ["fass", "fasr", "fasl", "fast"],
    "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"]
  },
  ga = {
    classic: {
      fab: "fa-brands",
      fad: "fa-duotone",
      fal: "fa-light",
      far: "fa-regular",
      fas: "fa-solid",
      fat: "fa-thin"
    },
    duotone: {
      fadr: "fa-regular",
      fadl: "fa-light",
      fadt: "fa-thin"
    },
    sharp: {
      fass: "fa-solid",
      fasr: "fa-regular",
      fasl: "fa-light",
      fast: "fa-thin"
    },
    "sharp-duotone": {
      fasds: "fa-solid",
      fasdr: "fa-regular",
      fasdl: "fa-light",
      fasdt: "fa-thin"
    }
  },
  x = ["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands"],
  Ia = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", ...r$1, ...x],
  m$1 = ["solid", "regular", "light", "thin", "duotone", "brands"],
  c$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  F$1 = c$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  ma = [...Object.keys(I$1), ...m$1, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", t$1.GROUP, t$1.SWAP_OPACITY, t$1.PRIMARY, t$1.SECONDARY].concat(c$1.map(a => "".concat(a, "x"))).concat(F$1.map(a => "w-".concat(a)));
var wa = {
    "Font Awesome 5 Free": {
      900: "fas",
      400: "far"
    },
    "Font Awesome 5 Pro": {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal"
    },
    "Font Awesome 5 Brands": {
      400: "fab",
      normal: "fab"
    },
    "Font Awesome 5 Duotone": {
      900: "fad"
    }
  };

const NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
const UNITS_IN_GRID = 16;
const DEFAULT_CSS_PREFIX = 'fa';
const DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
const DATA_FA_I2SVG = 'data-fa-i2svg';
const DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
const DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
const DATA_PREFIX = 'data-prefix';
const DATA_ICON = 'data-icon';
const HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
const MUTATION_APPROACH_ASYNC = 'async';
const TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
const PRODUCTION$1 = (() => {
  try {
    return process.env.NODE_ENV === 'production';
  } catch (e$$1) {
    return false;
  }
})();
function familyProxy(obj) {
  // Defaults to the classic family if family is not available
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : target[s];
    }
  });
}
const _PREFIX_TO_STYLE = _objectSpread2$1({}, S);

// We changed FACSSClassesToStyleId in the icons repo to be canonical and as such, "classic" family does not have any
// duotone styles.  But we do still need duotone in _PREFIX_TO_STYLE below, so we are manually adding
// {'fa-duotone': 'duotone'}
_PREFIX_TO_STYLE[s] = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, {
  'fa-duotone': 'duotone'
}), S[s]), St['kit']), St['kit-duotone']);
const PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
const _STYLE_TO_PREFIX = _objectSpread2$1({}, xt);

// We changed FAStyleIdToShortPrefixId in the icons repo to be canonical and as such, "classic" family does not have any
// duotone styles.  But we do still need duotone in _STYLE_TO_PREFIX below, so we are manually adding {duotone: 'fad'}
_STYLE_TO_PREFIX[s] = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, {
  duotone: 'fad'
}), _STYLE_TO_PREFIX[s]), Et['kit']), Et['kit-duotone']);
const STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
const _PREFIX_TO_LONG_STYLE = _objectSpread2$1({}, ga);
_PREFIX_TO_LONG_STYLE[s] = _objectSpread2$1(_objectSpread2$1({}, _PREFIX_TO_LONG_STYLE[s]), Wt['kit']);
const PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
const _LONG_STYLE_TO_PREFIX = _objectSpread2$1({}, ua);
_LONG_STYLE_TO_PREFIX[s] = _objectSpread2$1(_objectSpread2$1({}, _LONG_STYLE_TO_PREFIX[s]), Ct['kit']);
familyProxy(_LONG_STYLE_TO_PREFIX);
const ICON_SELECTION_SYNTAX_PATTERN = p; // eslint-disable-line no-useless-escape

const LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
const FONT_FAMILY_PATTERN = g;
const _FONT_WEIGHT_TO_PREFIX = _objectSpread2$1({}, G);
familyProxy(_FONT_WEIGHT_TO_PREFIX);
const ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
const DUOTONE_CLASSES = A;
const RESERVED_CLASSES = [...At, ...ma];

const initial = WINDOW.FontAwesomeConfig || {};
function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');
  if (element) {
    return element.getAttribute(attr);
  }
}
function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}
if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  const attrs = [['data-family-prefix', 'familyPrefix'], ['data-css-prefix', 'cssPrefix'], ['data-family-default', 'familyDefault'], ['data-style-default', 'styleDefault'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
  attrs.forEach(_ref => {
    let [attr, key] = _ref;
    const val = coerce(getAttrConfig(attr));
    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}
const _default = {
  styleDefault: 'solid',
  familyDefault: s,
  cssPrefix: DEFAULT_CSS_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: 'async',
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
};

// familyPrefix is deprecated but we must still support it if present
if (initial.familyPrefix) {
  initial.cssPrefix = initial.familyPrefix;
}
const _config = _objectSpread2$1(_objectSpread2$1({}, _default), initial);
if (!_config.autoReplaceSvg) _config.observeMutations = false;
const config = {};
Object.keys(_default).forEach(key => {
  Object.defineProperty(config, key, {
    enumerable: true,
    set: function (val) {
      _config[key] = val;
      _onChangeCb.forEach(cb => cb(config));
    },
    get: function () {
      return _config[key];
    }
  });
});

// familyPrefix is deprecated as of 6.2.0 and should be removed in 7.0.0
Object.defineProperty(config, 'familyPrefix', {
  enumerable: true,
  set: function (val) {
    _config.cssPrefix = val;
    _onChangeCb.forEach(cb => cb(config));
  },
  get: function () {
    return _config.cssPrefix;
  }
});
WINDOW.FontAwesomeConfig = config;
const _onChangeCb = [];
function onChange(cb) {
  _onChangeCb.push(cb);
  return () => {
    _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
  };
}

const d$2 = UNITS_IN_GRID;
const meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};
function insertCss(css) {
  if (!css || !IS_DOM) {
    return;
  }
  const style = DOCUMENT.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  const headChildren = DOCUMENT.head.childNodes;
  let beforeChild = null;
  for (let i = headChildren.length - 1; i > -1; i--) {
    const child = headChildren[i];
    const tagName = (child.tagName || '').toUpperCase();
    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }
  DOCUMENT.head.insertBefore(style, beforeChild);
  return css;
}
const idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function nextUniqueId() {
  let size = 12;
  let id = '';
  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }
  return id;
}
function toArray(obj) {
  const array = [];
  for (let i = (obj || []).length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}
function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute('class') || '').split(' ').filter(i => i);
  }
}
function htmlEscape(str) {
  return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce((acc, attributeName) => {
    return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
  }, '').trim();
}
function joinStyles(styles) {
  return Object.keys(styles || {}).reduce((acc, styleName) => {
    return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
  }, '');
}
function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}
function transformForSvg(_ref) {
  let {
    transform,
    containerWidth,
    iconWidth
  } = _ref;
  const outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  const inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  const path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer,
    inner,
    path
  };
}
function transformForCss(_ref2) {
  let {
    transform,
    width = UNITS_IN_GRID,
    height = UNITS_IN_GRID,
    startCentered = false
  } = _ref2;
  let val = '';
  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d$2 - width / 2, "em, ").concat(transform.y / d$2 - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d$2, "em), calc(-50% + ").concat(transform.y / d$2, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d$2, "em, ").concat(transform.y / d$2, "em) ");
  }
  val += "scale(".concat(transform.size / d$2 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$2 * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}

var baseStyles = ":root, :host {\n  --fa-font-solid: normal 900 1em/1 \"Font Awesome 6 Free\";\n  --fa-font-regular: normal 400 1em/1 \"Font Awesome 6 Free\";\n  --fa-font-light: normal 300 1em/1 \"Font Awesome 6 Pro\";\n  --fa-font-thin: normal 100 1em/1 \"Font Awesome 6 Pro\";\n  --fa-font-duotone: normal 900 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-duotone-regular: normal 400 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-duotone-light: normal 300 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-duotone-thin: normal 100 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-brands: normal 400 1em/1 \"Font Awesome 6 Brands\";\n  --fa-font-sharp-solid: normal 900 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-regular: normal 400 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-light: normal 300 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-thin: normal 100 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 \"Font Awesome 6 Sharp Duotone\";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 \"Font Awesome 6 Sharp Duotone\";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 \"Font Awesome 6 Sharp Duotone\";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 \"Font Awesome 6 Sharp Duotone\";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}";

function css() {
  const dcp = DEFAULT_CSS_PREFIX;
  const drc = DEFAULT_REPLACEMENT_CLASS;
  const fp = config.cssPrefix;
  const rc = config.replacementClass;
  let s = baseStyles;
  if (fp !== dcp || rc !== drc) {
    const dPatt = new RegExp("\\.".concat(dcp, "\\-"), 'g');
    const customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), 'g');
    const rPatt = new RegExp("\\.".concat(drc), 'g');
    s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }
  return s;
}
let _cssInserted = false;
function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}
var InjectCSS = {
  mixout() {
    return {
      dom: {
        css,
        insertCss: ensureCss
      }
    };
  },
  hooks() {
    return {
      beforeDOMElementCreation() {
        ensureCss();
      },
      beforeI2svg() {
        ensureCss();
      }
    };
  }
};

const w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w[NAMESPACE_IDENTIFIER];

const functions = [];
const listener = function () {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(fn => fn());
};
let loaded = false;
if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}
function domready (fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
}

function toHtml(abstractNodes) {
  const {
    tag,
    attributes = {},
    children = []
  } = abstractNodes;
  if (typeof abstractNodes === 'string') {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
  }
}

function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix,
      iconName,
      icon: mapping[prefix][iconName]
    };
  }
}

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
    length = keys.length,
    iterator = fn,
    i,
    key,
    result;
  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }
  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }
  return result;
};

/**
 * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
 *
 * Copyright Mathias Bynens <https://mathiasbynens.be/>

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) {
        // eslint-disable-line eqeqeq
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function toHex(unicode) {
  const decoded = ucs2decode(unicode);
  return decoded.length === 1 ? decoded[0].toString(16) : null;
}
function codePointAt(string, index) {
  const size = string.length;
  let first = string.charCodeAt(index);
  let second;
  if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
    second = string.charCodeAt(index + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}

function normalizeIcons(icons) {
  return Object.keys(icons).reduce((acc, iconName) => {
    const icon = icons[iconName];
    const expanded = !!icon.icon;
    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }
    return acc;
  }, {});
}
function defineIcons(prefix, icons) {
  let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    skipHooks = false
  } = params;
  const normalized = normalizeIcons(icons);
  if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
    namespace.hooks.addPack(prefix, normalizeIcons(icons));
  } else {
    namespace.styles[prefix] = _objectSpread2$1(_objectSpread2$1({}, namespace.styles[prefix] || {}), normalized);
  }

  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll ease the upgrade process for our users by automatically defining
   * this as well.
   */
  if (prefix === 'fas') {
    defineIcons('fa', icons);
  }
}

const {
  styles,
  shims
} = namespace;
const FAMILY_NAMES = Object.keys(PREFIX_TO_LONG_STYLE);
const PREFIXES_FOR_FAMILY = FAMILY_NAMES.reduce((acc, familyId) => {
  acc[familyId] = Object.keys(PREFIX_TO_LONG_STYLE[familyId]);
  return acc;
}, {});
let _defaultUsablePrefix = null;
let _byUnicode = {};
let _byLigature = {};
let _byOldName = {};
let _byOldUnicode = {};
let _byAlias = {};
function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}
function getIconName(cssPrefix, cls) {
  const parts = cls.split('-');
  const prefix = parts[0];
  const iconName = parts.slice(1).join('-');
  if (prefix === cssPrefix && iconName !== '' && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}
const build = () => {
  const lookup = reducer => {
    return reduce(styles, (o$$1, style, prefix) => {
      o$$1[prefix] = reduce(style, reducer, {});
      return o$$1;
    }, {});
  };
  _byUnicode = lookup((acc, icon, iconName) => {
    if (icon[3]) {
      acc[icon[3]] = iconName;
    }
    if (icon[2]) {
      const aliases = icon[2].filter(a$$1 => {
        return typeof a$$1 === 'number';
      });
      aliases.forEach(alias => {
        acc[alias.toString(16)] = iconName;
      });
    }
    return acc;
  });
  _byLigature = lookup((acc, icon, iconName) => {
    acc[iconName] = iconName;
    if (icon[2]) {
      const aliases = icon[2].filter(a$$1 => {
        return typeof a$$1 === 'string';
      });
      aliases.forEach(alias => {
        acc[alias] = iconName;
      });
    }
    return acc;
  });
  _byAlias = lookup((acc, icon, iconName) => {
    const aliases = icon[2];
    acc[iconName] = iconName;
    aliases.forEach(alias => {
      acc[alias] = iconName;
    });
    return acc;
  });

  // If we have a Kit, we can't determine if regular is available since we
  // could be auto-fetching it. We'll have to assume that it is available.
  const hasRegular = 'far' in styles || config.autoFetchSvg;
  const shimLookups = reduce(shims, (acc, shim) => {
    const maybeNameMaybeUnicode = shim[0];
    let prefix = shim[1];
    const iconName = shim[2];
    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }
    if (typeof maybeNameMaybeUnicode === 'string') {
      acc.names[maybeNameMaybeUnicode] = {
        prefix,
        iconName
      };
    }
    if (typeof maybeNameMaybeUnicode === 'number') {
      acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
        prefix,
        iconName
      };
    }
    return acc;
  }, {
    names: {},
    unicodes: {}
  });
  _byOldName = shimLookups.names;
  _byOldUnicode = shimLookups.unicodes;
  _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
    family: config.familyDefault
  });
};
onChange(c$$1 => {
  _defaultUsablePrefix = getCanonicalPrefix(c$$1.styleDefault, {
    family: config.familyDefault
  });
});
build();
function byUnicode(prefix, unicode) {
  return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
  return (_byLigature[prefix] || {})[ligature];
}
function byAlias(prefix, alias) {
  return (_byAlias[prefix] || {})[alias];
}
function byOldName(name) {
  return _byOldName[name] || {
    prefix: null,
    iconName: null
  };
}
function byOldUnicode(unicode) {
  const oldUnicode = _byOldUnicode[unicode];
  const newUnicode = byUnicode('fas', unicode);
  return oldUnicode || (newUnicode ? {
    prefix: 'fas',
    iconName: newUnicode
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function getDefaultUsablePrefix() {
  return _defaultUsablePrefix;
}
const emptyCanonicalIcon = () => {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function getFamilyId(values) {
  let family = s;
  const famProps = FAMILY_NAMES.reduce((acc, familyId) => {
    acc[familyId] = "".concat(config.cssPrefix, "-").concat(familyId);
    return acc;
  }, {});
  L.forEach(familyId => {
    if (values.includes(famProps[familyId]) || values.some(v$$1 => PREFIXES_FOR_FAMILY[familyId].includes(v$$1))) {
      family = familyId;
    }
  });
  return family;
}
function getCanonicalPrefix(styleOrPrefix) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    family = s
  } = params;
  const style = PREFIX_TO_STYLE[family][styleOrPrefix];

  // handles the exception of passing in only a family of 'duotone' with no style
  if (family === t && !styleOrPrefix) {
    return 'fad';
  }
  const prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
  const defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
  const result = prefix || defined || null;
  return result;
}
function moveNonFaClassesToRest(classNames) {
  let rest = [];
  let iconName = null;
  classNames.forEach(cls => {
    const result = getIconName(config.cssPrefix, cls);
    if (result) {
      iconName = result;
    } else if (cls) {
      rest.push(cls);
    }
  });
  return {
    iconName,
    rest
  };
}
function sortedUniqueValues(arr) {
  return arr.sort().filter((value, index, arr) => {
    return arr.indexOf(value) === index;
  });
}
function getCanonicalIcon(values) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    skipLookups = false
  } = params;
  let givenPrefix = null;
  const faCombinedClasses = Ia.concat(bt$1);
  const faStyleOrFamilyClasses = sortedUniqueValues(values.filter(cls => faCombinedClasses.includes(cls)));
  const nonStyleOrFamilyClasses = sortedUniqueValues(values.filter(cls => !Ia.includes(cls)));
  const faStyles = faStyleOrFamilyClasses.filter(cls => {
    givenPrefix = cls;
    return !P.includes(cls);
  });
  const [styleFromValues = null] = faStyles;
  const family = getFamilyId(faStyleOrFamilyClasses);
  const canonical = _objectSpread2$1(_objectSpread2$1({}, moveNonFaClassesToRest(nonStyleOrFamilyClasses)), {}, {
    prefix: getCanonicalPrefix(styleFromValues, {
      family
    })
  });
  return _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, canonical), getDefaultCanonicalPrefix({
    values,
    family,
    styles,
    config,
    canonical,
    givenPrefix
  })), applyShimAndAlias(skipLookups, givenPrefix, canonical));
}
function applyShimAndAlias(skipLookups, givenPrefix, canonical) {
  let {
    prefix,
    iconName
  } = canonical;
  if (skipLookups || !prefix || !iconName) {
    return {
      prefix,
      iconName
    };
  }
  const shim = givenPrefix === 'fa' ? byOldName(iconName) : {};
  const aliasIconName = byAlias(prefix, iconName);
  iconName = shim.iconName || aliasIconName || iconName;
  prefix = shim.prefix || prefix;
  if (prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
    // Allow a fallback from the regular style to solid if regular is not available
    // but only if we aren't auto-fetching SVGs
    prefix = 'fas';
  }
  return {
    prefix,
    iconName
  };
}
const newCanonicalFamilies = L.filter(familyId => {
  return familyId !== s || familyId !== t;
});
const newCanonicalStyles = Object.keys(ga).filter(key => key !== s).map(key => Object.keys(ga[key])).flat();
function getDefaultCanonicalPrefix(prefixOptions) {
  const {
    values,
    family,
    canonical,
    givenPrefix = '',
    styles = {},
    config: config$$1 = {}
  } = prefixOptions;
  const isDuotoneFamily = family === t;
  const valuesHasDuotone = values.includes('fa-duotone') || values.includes('fad');
  const defaultFamilyIsDuotone = config$$1.familyDefault === 'duotone';
  const canonicalPrefixIsDuotone = canonical.prefix === 'fad' || canonical.prefix === 'fa-duotone';
  if (!isDuotoneFamily && (valuesHasDuotone || defaultFamilyIsDuotone || canonicalPrefixIsDuotone)) {
    canonical.prefix = 'fad';
  }
  if (values.includes('fa-brands') || values.includes('fab')) {
    canonical.prefix = 'fab';
  }
  if (!canonical.prefix && newCanonicalFamilies.includes(family)) {
    const validPrefix = Object.keys(styles).find(key => newCanonicalStyles.includes(key));
    if (validPrefix || config$$1.autoFetchSvg) {
      const defaultPrefix = pt.get(family).defaultShortPrefixId;
      canonical.prefix = defaultPrefix;
      canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
    }
  }
  if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
    // The fa prefix is not canonical. So if it has made it through until this point
    // we will shift it to the correct prefix.
    canonical.prefix = getDefaultUsablePrefix() || 'fas';
  }
  return canonical;
}

class Library {
  constructor() {
    this.definitions = {};
  }
  add() {
    for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
      definitions[_key] = arguments[_key];
    }
    const additions = definitions.reduce(this._pullDefinitions, {});
    Object.keys(additions).forEach(key => {
      this.definitions[key] = _objectSpread2$1(_objectSpread2$1({}, this.definitions[key] || {}), additions[key]);
      defineIcons(key, additions[key]);

      // TODO can we stop doing this? We can't get the icons by 'fa-solid' any longer so this probably needs to change
      const longPrefix = PREFIX_TO_LONG_STYLE[s][key];
      if (longPrefix) defineIcons(longPrefix, additions[key]);
      build();
    });
  }
  reset() {
    this.definitions = {};
  }
  _pullDefinitions(additions, definition) {
    const normalized = definition.prefix && definition.iconName && definition.icon ? {
      0: definition
    } : definition;
    Object.keys(normalized).map(key => {
      const {
        prefix,
        iconName,
        icon
      } = normalized[key];
      const aliases = icon[2];
      if (!additions[prefix]) additions[prefix] = {};
      if (aliases.length > 0) {
        aliases.forEach(alias => {
          if (typeof alias === 'string') {
            additions[prefix][alias] = icon;
          }
        });
      }
      additions[prefix][iconName] = icon;
    });
    return additions;
  }
}

let _plugins = [];
let _hooks = {};
const providers = {};
const defaultProviderKeys = Object.keys(providers);
function registerPlugins(nextPlugins, _ref) {
  let {
    mixoutsTo: obj
  } = _ref;
  _plugins = nextPlugins;
  _hooks = {};
  Object.keys(providers).forEach(k => {
    if (defaultProviderKeys.indexOf(k) === -1) {
      delete providers[k];
    }
  });
  _plugins.forEach(plugin => {
    const mixout = plugin.mixout ? plugin.mixout() : {};
    Object.keys(mixout).forEach(tk => {
      if (typeof mixout[tk] === 'function') {
        obj[tk] = mixout[tk];
      }
      if (typeof mixout[tk] === 'object') {
        Object.keys(mixout[tk]).forEach(sk => {
          if (!obj[tk]) {
            obj[tk] = {};
          }
          obj[tk][sk] = mixout[tk][sk];
        });
      }
    });
    if (plugin.hooks) {
      const hooks = plugin.hooks();
      Object.keys(hooks).forEach(hook => {
        if (!_hooks[hook]) {
          _hooks[hook] = [];
        }
        _hooks[hook].push(hooks[hook]);
      });
    }
    if (plugin.provides) {
      plugin.provides(providers);
    }
  });
  return obj;
}
function chainHooks(hook, accumulator) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  const hookFns = _hooks[hook] || [];
  hookFns.forEach(hookFn => {
    accumulator = hookFn.apply(null, [accumulator, ...args]); // eslint-disable-line no-useless-call
  });
  return accumulator;
}
function callHooks(hook) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  const hookFns = _hooks[hook] || [];
  hookFns.forEach(hookFn => {
    hookFn.apply(null, args);
  });
  return undefined;
}
function callProvided() {
  const hook = arguments[0];
  const args = Array.prototype.slice.call(arguments, 1);
  return providers[hook] ? providers[hook].apply(null, args) : undefined;
}

function findIconDefinition(iconLookup) {
  if (iconLookup.prefix === 'fa') {
    iconLookup.prefix = 'fas';
  }
  let {
    iconName
  } = iconLookup;
  const prefix = iconLookup.prefix || getDefaultUsablePrefix();
  if (!iconName) return;
  iconName = byAlias(prefix, iconName) || iconName;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}
const library = new Library();
const noAuto = () => {
  config.autoReplaceSvg = false;
  config.observeMutations = false;
  callHooks('noAuto');
};
const dom = {
  i2svg: function () {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (IS_DOM) {
      callHooks('beforeI2svg', params);
      callProvided('pseudoElements2svg', params);
      return callProvided('i2svg', params);
    } else {
      return Promise.reject(new Error('Operation requires a DOM of some kind.'));
    }
  },
  watch: function () {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      autoReplaceSvgRoot
    } = params;
    if (config.autoReplaceSvg === false) {
      config.autoReplaceSvg = true;
    }
    config.observeMutations = true;
    domready(() => {
      autoReplace({
        autoReplaceSvgRoot
      });
      callHooks('watch', params);
    });
  }
};
const parse = {
  icon: icon => {
    if (icon === null) {
      return null;
    }
    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
      return {
        prefix: icon.prefix,
        iconName: byAlias(icon.prefix, icon.iconName) || icon.iconName
      };
    }
    if (Array.isArray(icon) && icon.length === 2) {
      const iconName = icon[1].indexOf('fa-') === 0 ? icon[1].slice(3) : icon[1];
      const prefix = getCanonicalPrefix(icon[0]);
      return {
        prefix,
        iconName: byAlias(prefix, iconName) || iconName
      };
    }
    if (typeof icon === 'string' && (icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
      const canonicalIcon = getCanonicalIcon(icon.split(' '), {
        skipLookups: true
      });
      return {
        prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
        iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
      };
    }
    if (typeof icon === 'string') {
      const prefix = getDefaultUsablePrefix();
      return {
        prefix,
        iconName: byAlias(prefix, icon) || icon
      };
    }
  }
};
const api = {
  noAuto,
  config,
  dom,
  parse,
  library,
  findIconDefinition,
  toHtml
};
const autoReplace = function () {
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    autoReplaceSvgRoot = DOCUMENT
  } = params;
  if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
    node: autoReplaceSvgRoot
  });
};

function domVariants(val, abstractCreator) {
  Object.defineProperty(val, 'abstract', {
    get: abstractCreator
  });
  Object.defineProperty(val, 'html', {
    get: function () {
      return val.abstract.map(a => toHtml(a));
    }
  });
  Object.defineProperty(val, 'node', {
    get: function () {
      if (!IS_DOM) return;
      const container = DOCUMENT.createElement('div');
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}

function asIcon (_ref) {
  let {
    children,
    main,
    mask,
    attributes,
    styles,
    transform
  } = _ref;
  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    const {
      width,
      height
    } = main;
    const offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes['style'] = joinStyles(_objectSpread2$1(_objectSpread2$1({}, styles), {}, {
      'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    }));
  }
  return [{
    tag: 'svg',
    attributes,
    children
  }];
}

function asSymbol (_ref) {
  let {
    prefix,
    iconName,
    children,
    attributes,
    symbol
  } = _ref;
  const id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: 'svg',
    attributes: {
      style: 'display: none;'
    },
    children: [{
      tag: 'symbol',
      attributes: _objectSpread2$1(_objectSpread2$1({}, attributes), {}, {
        id
      }),
      children
    }]
  }];
}

function makeInlineSvgAbstract(params) {
  const {
    icons: {
      main,
      mask
    },
    prefix,
    iconName,
    transform,
    symbol,
    title,
    maskId,
    titleId,
    extra,
    watchable = false
  } = params;
  const {
    width,
    height
  } = mask.found ? mask : main;
  const isUploadedIcon = Lt.includes(prefix);
  const attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ''].filter(c$$1 => extra.classes.indexOf(c$$1) === -1).filter(c$$1 => c$$1 !== '' || !!c$$1).concat(extra.classes).join(' ');
  let content = {
    children: [],
    attributes: _objectSpread2$1(_objectSpread2$1({}, extra.attributes), {}, {
      'data-prefix': prefix,
      'data-icon': iconName,
      'class': attrClass,
      'role': extra.attributes.role || 'img',
      'xmlns': 'http://www.w3.org/2000/svg',
      'viewBox': "0 0 ".concat(width, " ").concat(height)
    })
  };
  const uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};
  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = '';
  }
  if (title) {
    content.children.push({
      tag: 'title',
      attributes: {
        id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });
    delete content.attributes.title;
  }
  const args = _objectSpread2$1(_objectSpread2$1({}, content), {}, {
    prefix,
    iconName,
    main,
    mask,
    maskId,
    transform,
    symbol,
    styles: _objectSpread2$1(_objectSpread2$1({}, uploadedIconWidthStyle), extra.styles)
  });
  const {
    children,
    attributes
  } = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
    children: [],
    attributes: {}
  } : callProvided('generateAbstractIcon', args) || {
    children: [],
    attributes: {}
  };
  args.children = children;
  args.attributes = attributes;
  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}
function makeLayersTextAbstract(params) {
  const {
    content,
    width,
    height,
    transform,
    title,
    extra,
    watchable = false
  } = params;
  const attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    'title': title
  } : {}), {}, {
    'class': extra.classes.join(' ')
  });
  if (watchable) {
    attributes[DATA_FA_I2SVG] = '';
  }
  const styles = _objectSpread2$1({}, extra.styles);
  if (transformIsMeaningful(transform)) {
    styles['transform'] = transformForCss({
      transform,
      startCentered: true,
      width,
      height
    });
    styles['-webkit-transform'] = styles['transform'];
  }
  const styleString = joinStyles(styles);
  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }
  const val = [];
  val.push({
    tag: 'span',
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }
  return val;
}
function makeLayersCounterAbstract(params) {
  const {
    content,
    title,
    extra
  } = params;
  const attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    'title': title
  } : {}), {}, {
    'class': extra.classes.join(' ')
  });
  const styleString = joinStyles(extra.styles);
  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }
  const val = [];
  val.push({
    tag: 'span',
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }
  return val;
}

const {
  styles: styles$1
} = namespace;
function asFoundIcon(icon) {
  const width = icon[0];
  const height = icon[1];
  const [vectorData] = icon.slice(4);
  let element = null;
  if (Array.isArray(vectorData)) {
    element = {
      tag: 'g',
      attributes: {
        class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: 'path',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: 'currentColor',
          d: vectorData[0]
        }
      }, {
        tag: 'path',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: 'currentColor',
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: 'path',
      attributes: {
        fill: 'currentColor',
        d: vectorData
      }
    };
  }
  return {
    found: true,
    width,
    height,
    icon: element
  };
}
const missingIconResolutionMixin = {
  found: false,
  width: 512,
  height: 512
};
function maybeNotifyMissing(iconName, prefix) {
  if (!PRODUCTION$1 && !config.showMissingIcons && iconName) {
    console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
  }
}
function findIcon(iconName, prefix) {
  let givenPrefix = prefix;
  if (prefix === 'fa' && config.styleDefault !== null) {
    prefix = getDefaultUsablePrefix();
  }
  return new Promise((resolve, reject) => {
    if (givenPrefix === 'fa') {
      const shim = byOldName(iconName) || {};
      iconName = shim.iconName || iconName;
      prefix = shim.prefix || prefix;
    }
    if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
      const icon = styles$1[prefix][iconName];
      return resolve(asFoundIcon(icon));
    }
    maybeNotifyMissing(iconName, prefix);
    resolve(_objectSpread2$1(_objectSpread2$1({}, missingIconResolutionMixin), {}, {
      icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
    }));
  });
}

const noop$1 = () => {};
const p$2 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};
const preamble = "FA \"6.7.2\"";
const begin = name => {
  p$2.mark("".concat(preamble, " ").concat(name, " begins"));
  return () => end(name);
};
const end = name => {
  p$2.mark("".concat(preamble, " ").concat(name, " ends"));
  p$2.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
};
var perf = {
  begin,
  end
};

const noop$2 = () => {};
function isWatched(node) {
  const i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
  return typeof i2svg === 'string';
}
function hasPrefixAndIcon(node) {
  const prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
  const icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
  return prefix && icon;
}
function hasBeenReplaced(node) {
  return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
}
function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }
  const mutator = mutators[config.autoReplaceSvg];
  return mutator || mutators.replace;
}
function createElementNS(tag) {
  return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
}
function createElement(tag) {
  return DOCUMENT.createElement(tag);
}
function convertSVG(abstractObj) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    ceFn = abstractObj.tag === 'svg' ? createElementNS : createElement
  } = params;
  if (typeof abstractObj === 'string') {
    return DOCUMENT.createTextNode(abstractObj);
  }
  const tag = ceFn(abstractObj.tag);
  Object.keys(abstractObj.attributes || []).forEach(function (key) {
    tag.setAttribute(key, abstractObj.attributes[key]);
  });
  const children = abstractObj.children || [];
  children.forEach(function (child) {
    tag.appendChild(convertSVG(child, {
      ceFn
    }));
  });
  return tag;
}
function nodeAsComment(node) {
  let comment = " ".concat(node.outerHTML, " ");
  /* BEGIN.ATTRIBUTION */
  comment = "".concat(comment, "Font Awesome fontawesome.com ");
  /* END.ATTRIBUTION */
  return comment;
}
const mutators = {
  replace: function (mutation) {
    const node = mutation[0];
    if (node.parentNode) {
      mutation[1].forEach(abstract => {
        node.parentNode.insertBefore(convertSVG(abstract), node);
      });
      if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
        let comment = DOCUMENT.createComment(nodeAsComment(node));
        node.parentNode.replaceChild(comment, node);
      } else {
        node.remove();
      }
    }
  },
  nest: function (mutation) {
    const node = mutation[0];
    const abstract = mutation[1];

    // If we already have a replaced node we do not want to continue nesting within it.
    // Short-circuit to the standard replacement
    if (~classArray(node).indexOf(config.replacementClass)) {
      return mutators.replace(mutation);
    }
    const forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
    delete abstract[0].attributes.id;
    if (abstract[0].attributes.class) {
      const splitClasses = abstract[0].attributes.class.split(' ').reduce((acc, cls) => {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }
        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(' ');
      if (splitClasses.toNode.length === 0) {
        node.removeAttribute('class');
      } else {
        node.setAttribute('class', splitClasses.toNode.join(' '));
      }
    }
    const newInnerHTML = abstract.map(a => toHtml(a)).join('\n');
    node.setAttribute(DATA_FA_I2SVG, '');
    node.innerHTML = newInnerHTML;
  }
};
function performOperationSync(op) {
  op();
}
function perform(mutations, callback) {
  const callbackFunction = typeof callback === 'function' ? callback : noop$2;
  if (mutations.length === 0) {
    callbackFunction();
  } else {
    let frame = performOperationSync;
    if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
      frame = WINDOW.requestAnimationFrame || performOperationSync;
    }
    frame(() => {
      const mutator = getMutator();
      const mark = perf.begin('mutate');
      mutations.map(mutator);
      mark();
      callbackFunction();
    });
  }
}
let disabled = false;
function disableObservation() {
  disabled = true;
}
function enableObservation() {
  disabled = false;
}
let mo = null;
function observe(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }
  if (!config.observeMutations) {
    return;
  }
  const {
    treeCallback = noop$2,
    nodeCallback = noop$2,
    pseudoElementsCallback = noop$2,
    observeMutationsRoot = DOCUMENT
  } = options;
  mo = new MUTATION_OBSERVER(objects => {
    if (disabled) return;
    const defaultPrefix = getDefaultUsablePrefix();
    toArray(objects).forEach(mutationRecord => {
      if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }
        treeCallback(mutationRecord.target);
      }
      if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }
      if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
          const {
            prefix,
            iconName
          } = getCanonicalIcon(classArray(mutationRecord.target));
          mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
          if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
        } else if (hasBeenReplaced(mutationRecord.target)) {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });
  if (!IS_DOM) return;
  mo.observe(observeMutationsRoot, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });
}
function disconnect() {
  if (!mo) return;
  mo.disconnect();
}

function styleParser (node) {
  const style = node.getAttribute('style');
  let val = [];
  if (style) {
    val = style.split(';').reduce((acc, style) => {
      const styles = style.split(':');
      const prop = styles[0];
      const value = styles.slice(1);
      if (prop && value.length > 0) {
        acc[prop] = value.join(':').trim();
      }
      return acc;
    }, {});
  }
  return val;
}

function classParser (node) {
  const existingPrefix = node.getAttribute('data-prefix');
  const existingIconName = node.getAttribute('data-icon');
  const innerText = node.innerText !== undefined ? node.innerText.trim() : '';
  let val = getCanonicalIcon(classArray(node));
  if (!val.prefix) {
    val.prefix = getDefaultUsablePrefix();
  }
  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }
  if (val.iconName && val.prefix) {
    return val;
  }
  if (val.prefix && innerText.length > 0) {
    val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
  }
  if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
    val.iconName = node.firstChild.data;
  }
  return val;
}

function attributesParser (node) {
  const extraAttributes = toArray(node.attributes).reduce((acc, attr) => {
    if (acc.name !== 'class' && acc.name !== 'style') {
      acc[attr.name] = attr.value;
    }
    return acc;
  }, {});
  const title = node.getAttribute('title');
  const titleId = node.getAttribute('data-fa-title-id');
  if (config.autoA11y) {
    if (title) {
      extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
    } else {
      extraAttributes['aria-hidden'] = 'true';
      extraAttributes['focusable'] = 'false';
    }
  }
  return extraAttributes;
}

function blankMeta() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function parseMeta(node) {
  let parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    styleParser: true
  };
  const {
    iconName,
    prefix,
    rest: extraClasses
  } = classParser(node);
  const extraAttributes = attributesParser(node);
  const pluginMeta = chainHooks('parseNodeAttributes', {}, node);
  let extraStyles = parser.styleParser ? styleParser(node) : [];
  return _objectSpread2$1({
    iconName,
    title: node.getAttribute('title'),
    titleId: node.getAttribute('data-fa-title-id'),
    prefix,
    transform: meaninglessTransform,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: false,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    }
  }, pluginMeta);
}

const {
  styles: styles$2
} = namespace;
function generateMutation(node) {
  const nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
    styleParser: false
  }) : parseMeta(node);
  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return callProvided('generateLayersText', node, nodeMeta);
  } else {
    return callProvided('generateSvgReplacementMutation', node, nodeMeta);
  }
}
function getKnownPrefixes() {
  return [...Ft, ...Ia];
}
function onTree(root) {
  let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!IS_DOM) return Promise.resolve();
  const htmlClassList = DOCUMENT.documentElement.classList;
  const hclAdd = suffix => htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  const hclRemove = suffix => htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  const prefixes = config.autoFetchSvg ? getKnownPrefixes() : P.concat(Object.keys(styles$2));
  if (!prefixes.includes('fa')) {
    prefixes.push('fa');
  }
  const prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(p$$1 => ".".concat(p$$1, ":not([").concat(DATA_FA_I2SVG, "])"))).join(', ');
  if (prefixesDomQuery.length === 0) {
    return Promise.resolve();
  }
  let candidates = [];
  try {
    candidates = toArray(root.querySelectorAll(prefixesDomQuery));
  } catch (e$$1) {
    // noop
  }
  if (candidates.length > 0) {
    hclAdd('pending');
    hclRemove('complete');
  } else {
    return Promise.resolve();
  }
  const mark = perf.begin('onTree');
  const mutations = candidates.reduce((acc, node) => {
    try {
      const mutation = generateMutation(node);
      if (mutation) {
        acc.push(mutation);
      }
    } catch (e$$1) {
      if (!PRODUCTION$1) {
        if (e$$1.name === 'MissingIcon') {
          console.error(e$$1);
        }
      }
    }
    return acc;
  }, []);
  return new Promise((resolve, reject) => {
    Promise.all(mutations).then(resolvedMutations => {
      perform(resolvedMutations, () => {
        hclAdd('active');
        hclAdd('complete');
        hclRemove('pending');
        if (typeof callback === 'function') callback();
        mark();
        resolve();
      });
    }).catch(e$$1 => {
      mark();
      reject(e$$1);
    });
  });
}
function onNode(node) {
  let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  generateMutation(node).then(mutation => {
    if (mutation) {
      perform([mutation], callback);
    }
  });
}
function resolveIcons(next) {
  return function (maybeIconDefinition) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    let {
      mask
    } = params;
    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }
    return next(iconDefinition, _objectSpread2$1(_objectSpread2$1({}, params), {}, {
      mask
    }));
  };
}
const render = function (iconDefinition) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    transform = meaninglessTransform,
    symbol = false,
    mask = null,
    maskId = null,
    title = null,
    titleId = null,
    classes = [],
    attributes = {},
    styles = {}
  } = params;
  if (!iconDefinition) return;
  const {
    prefix,
    iconName,
    icon
  } = iconDefinition;
  return domVariants(_objectSpread2$1({
    type: 'icon'
  }, iconDefinition), () => {
    callHooks('beforeDOMElementCreation', {
      iconDefinition,
      params
    });
    if (config.autoA11y) {
      if (title) {
        attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        attributes['aria-hidden'] = 'true';
        attributes['focusable'] = 'false';
      }
    }
    return makeInlineSvgAbstract({
      icons: {
        main: asFoundIcon(icon),
        mask: mask ? asFoundIcon(mask.icon) : {
          found: false,
          width: null,
          height: null,
          icon: {}
        }
      },
      prefix,
      iconName,
      transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
      symbol,
      title,
      maskId,
      titleId,
      extra: {
        attributes,
        styles,
        classes
      }
    });
  });
};
var ReplaceElements = {
  mixout() {
    return {
      icon: resolveIcons(render)
    };
  },
  hooks() {
    return {
      mutationObserverCallbacks(accumulator) {
        accumulator.treeCallback = onTree;
        accumulator.nodeCallback = onNode;
        return accumulator;
      }
    };
  },
  provides(providers$$1) {
    providers$$1.i2svg = function (params) {
      const {
        node = DOCUMENT,
        callback = () => {}
      } = params;
      return onTree(node, callback);
    };
    providers$$1.generateSvgReplacementMutation = function (node, nodeMeta) {
      const {
        iconName,
        title,
        titleId,
        prefix,
        transform,
        symbol,
        mask,
        maskId,
        extra
      } = nodeMeta;
      return new Promise((resolve, reject) => {
        Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
          found: false,
          width: 512,
          height: 512,
          icon: {}
        })]).then(_ref => {
          let [main, mask] = _ref;
          resolve([node, makeInlineSvgAbstract({
            icons: {
              main,
              mask
            },
            prefix,
            iconName,
            transform,
            symbol,
            maskId,
            title,
            titleId,
            extra,
            watchable: true
          })]);
        }).catch(reject);
      });
    };
    providers$$1.generateAbstractIcon = function (_ref2) {
      let {
        children,
        attributes,
        main,
        transform,
        styles
      } = _ref2;
      const styleString = joinStyles(styles);
      if (styleString.length > 0) {
        attributes['style'] = styleString;
      }
      let nextChild;
      if (transformIsMeaningful(transform)) {
        nextChild = callProvided('generateAbstractTransformGrouping', {
          main,
          transform,
          containerWidth: main.width,
          iconWidth: main.width
        });
      }
      children.push(nextChild || main.icon);
      return {
        children,
        attributes
      };
    };
  }
};

var Layers = {
  mixout() {
    return {
      layer(assembler) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const {
          classes = []
        } = params;
        return domVariants({
          type: 'layer'
        }, () => {
          callHooks('beforeDOMElementCreation', {
            assembler,
            params
          });
          let children = [];
          assembler(args => {
            Array.isArray(args) ? args.map(a => {
              children = children.concat(a.abstract);
            }) : children = children.concat(args.abstract);
          });
          return [{
            tag: 'span',
            attributes: {
              class: ["".concat(config.cssPrefix, "-layers"), ...classes].join(' ')
            },
            children
          }];
        });
      }
    };
  }
};

var LayersCounter = {
  mixout() {
    return {
      counter(content) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const {
          title = null,
          classes = [],
          attributes = {},
          styles = {}
        } = params;
        return domVariants({
          type: 'counter',
          content
        }, () => {
          callHooks('beforeDOMElementCreation', {
            content,
            params
          });
          return makeLayersCounterAbstract({
            content: content.toString(),
            title,
            extra: {
              attributes,
              styles,
              classes: ["".concat(config.cssPrefix, "-layers-counter"), ...classes]
            }
          });
        });
      }
    };
  }
};

var LayersText = {
  mixout() {
    return {
      text(content) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const {
          transform = meaninglessTransform,
          title = null,
          classes = [],
          attributes = {},
          styles = {}
        } = params;
        return domVariants({
          type: 'text',
          content
        }, () => {
          callHooks('beforeDOMElementCreation', {
            content,
            params
          });
          return makeLayersTextAbstract({
            content,
            transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
            title,
            extra: {
              attributes,
              styles,
              classes: ["".concat(config.cssPrefix, "-layers-text"), ...classes]
            }
          });
        });
      }
    };
  },
  provides(providers$$1) {
    providers$$1.generateLayersText = function (node, nodeMeta) {
      const {
        title,
        transform,
        extra
      } = nodeMeta;
      let width = null;
      let height = null;
      if (IS_IE) {
        const computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
        const boundingClientRect = node.getBoundingClientRect();
        width = boundingClientRect.width / computedFontSize;
        height = boundingClientRect.height / computedFontSize;
      }
      if (config.autoA11y && !title) {
        extra.attributes['aria-hidden'] = 'true';
      }
      return Promise.resolve([node, makeLayersTextAbstract({
        content: node.innerHTML,
        width,
        height,
        transform,
        title,
        extra,
        watchable: true
      })]);
    };
  }
};

const CLEAN_CONTENT_PATTERN = new RegExp('\u{22}', 'ug');
const SECONDARY_UNICODE_RANGE = [1105920, 1112319];
const _FONT_FAMILY_WEIGHT_TO_PREFIX = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, {
  FontAwesome: {
    normal: 'fas',
    400: 'fas'
  }
}), lt), wa), Yt);
const FONT_FAMILY_WEIGHT_TO_PREFIX = Object.keys(_FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, key) => {
  acc[key.toLowerCase()] = _FONT_FAMILY_WEIGHT_TO_PREFIX[key];
  return acc;
}, {});
const FONT_FAMILY_WEIGHT_FALLBACK = Object.keys(FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, fontFamily) => {
  const weights = FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamily];
  acc[fontFamily] = weights[900] || [...Object.entries(weights)][0][1];
  return acc;
}, {});
function hexValueFromContent(content) {
  const cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
  const codePoint = codePointAt(cleaned, 0);
  const isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
  const isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
  return {
    value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
    isSecondary: isPrependTen || isDoubled
  };
}
function getPrefix(fontFamily, fontWeight) {
  const fontFamilySanitized = fontFamily.replace(/^['"]|['"]$/g, '').toLowerCase();
  const fontWeightInteger = parseInt(fontWeight);
  const fontWeightSanitized = isNaN(fontWeightInteger) ? 'normal' : fontWeightInteger;
  return (FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamilySanitized] || {})[fontWeightSanitized] || FONT_FAMILY_WEIGHT_FALLBACK[fontFamilySanitized];
}
function replaceForPosition(node, position) {
  const pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
  return new Promise((resolve, reject) => {
    if (node.getAttribute(pendingAttribute) !== null) {
      // This node is already being processed
      return resolve();
    }
    const children = toArray(node.children);
    const alreadyProcessedPseudoElement = children.filter(c$$1 => c$$1.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position)[0];
    const styles = WINDOW.getComputedStyle(node, position);
    const fontFamily = styles.getPropertyValue('font-family');
    const fontFamilyMatch = fontFamily.match(FONT_FAMILY_PATTERN);
    const fontWeight = styles.getPropertyValue('font-weight');
    const content = styles.getPropertyValue('content');
    if (alreadyProcessedPseudoElement && !fontFamilyMatch) {
      // If we've already processed it but the current computed style does not result in a font-family,
      // that probably means that a class name that was previously present to make the icon has been
      // removed. So we now should delete the icon.
      node.removeChild(alreadyProcessedPseudoElement);
      return resolve();
    } else if (fontFamilyMatch && content !== 'none' && content !== '') {
      const content = styles.getPropertyValue('content');
      let prefix = getPrefix(fontFamily, fontWeight);
      const {
        value: hexValue,
        isSecondary
      } = hexValueFromContent(content);
      const isV4 = fontFamilyMatch[0].startsWith('FontAwesome');
      let iconName = byUnicode(prefix, hexValue);
      let iconIdentifier = iconName;
      if (isV4) {
        const iconName4 = byOldUnicode(hexValue);
        if (iconName4.iconName && iconName4.prefix) {
          iconName = iconName4.iconName;
          prefix = iconName4.prefix;
        }
      }

      // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
      // already done so with the same prefix and iconName
      if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
        node.setAttribute(pendingAttribute, iconIdentifier);
        if (alreadyProcessedPseudoElement) {
          // Delete the old one, since we're replacing it with a new one
          node.removeChild(alreadyProcessedPseudoElement);
        }
        const meta = blankMeta();
        const {
          extra
        } = meta;
        extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
        findIcon(iconName, prefix).then(main => {
          const abstract = makeInlineSvgAbstract(_objectSpread2$1(_objectSpread2$1({}, meta), {}, {
            icons: {
              main,
              mask: emptyCanonicalIcon()
            },
            prefix,
            iconName: iconIdentifier,
            extra,
            watchable: true
          }));
          const element = DOCUMENT.createElementNS('http://www.w3.org/2000/svg', 'svg');
          if (position === '::before') {
            node.insertBefore(element, node.firstChild);
          } else {
            node.appendChild(element);
          }
          element.outerHTML = abstract.map(a$$1 => toHtml(a$$1)).join('\n');
          node.removeAttribute(pendingAttribute);
          resolve();
        }).catch(reject);
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}
function replace(node) {
  return Promise.all([replaceForPosition(node, '::before'), replaceForPosition(node, '::after')]);
}
function processable(node) {
  return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
}
function searchPseudoElements(root) {
  if (!IS_DOM) return;
  return new Promise((resolve, reject) => {
    const operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
    const end = perf.begin('searchPseudoElements');
    disableObservation();
    Promise.all(operations).then(() => {
      end();
      enableObservation();
      resolve();
    }).catch(() => {
      end();
      enableObservation();
      reject();
    });
  });
}
var PseudoElements = {
  hooks() {
    return {
      mutationObserverCallbacks(accumulator) {
        accumulator.pseudoElementsCallback = searchPseudoElements;
        return accumulator;
      }
    };
  },
  provides(providers) {
    providers.pseudoElements2svg = function (params) {
      const {
        node = DOCUMENT
      } = params;
      if (config.searchPseudoElements) {
        searchPseudoElements(node);
      }
    };
  }
};

let _unwatched = false;
var MutationObserver$1 = {
  mixout() {
    return {
      dom: {
        unwatch() {
          disableObservation();
          _unwatched = true;
        }
      }
    };
  },
  hooks() {
    return {
      bootstrap() {
        observe(chainHooks('mutationObserverCallbacks', {}));
      },
      noAuto() {
        disconnect();
      },
      watch(params) {
        const {
          observeMutationsRoot
        } = params;
        if (_unwatched) {
          enableObservation();
        } else {
          observe(chainHooks('mutationObserverCallbacks', {
            observeMutationsRoot
          }));
        }
      }
    };
  }
};

const parseTransformString = transformString => {
  let transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };
  return transformString.toLowerCase().split(' ').reduce((acc, n) => {
    const parts = n.toLowerCase().split('-');
    const first = parts[0];
    let rest = parts.slice(1).join('-');
    if (first && rest === 'h') {
      acc.flipX = true;
      return acc;
    }
    if (first && rest === 'v') {
      acc.flipY = true;
      return acc;
    }
    rest = parseFloat(rest);
    if (isNaN(rest)) {
      return acc;
    }
    switch (first) {
      case 'grow':
        acc.size = acc.size + rest;
        break;
      case 'shrink':
        acc.size = acc.size - rest;
        break;
      case 'left':
        acc.x = acc.x - rest;
        break;
      case 'right':
        acc.x = acc.x + rest;
        break;
      case 'up':
        acc.y = acc.y - rest;
        break;
      case 'down':
        acc.y = acc.y + rest;
        break;
      case 'rotate':
        acc.rotate = acc.rotate + rest;
        break;
    }
    return acc;
  }, transform);
};
var PowerTransforms = {
  mixout() {
    return {
      parse: {
        transform: transformString => {
          return parseTransformString(transformString);
        }
      }
    };
  },
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const transformString = node.getAttribute('data-fa-transform');
        if (transformString) {
          accumulator.transform = parseTransformString(transformString);
        }
        return accumulator;
      }
    };
  },
  provides(providers) {
    providers.generateAbstractTransformGrouping = function (_ref) {
      let {
        main,
        transform,
        containerWidth,
        iconWidth
      } = _ref;
      const outer = {
        transform: "translate(".concat(containerWidth / 2, " 256)")
      };
      const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
      const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
      const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
      const inner = {
        transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
      };
      const path = {
        transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
      };
      const operations = {
        outer,
        inner,
        path
      };
      return {
        tag: 'g',
        attributes: _objectSpread2$1({}, operations.outer),
        children: [{
          tag: 'g',
          attributes: _objectSpread2$1({}, operations.inner),
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: _objectSpread2$1(_objectSpread2$1({}, main.icon.attributes), operations.path)
          }]
        }]
      };
    };
  }
};

const ALL_SPACE = {
  x: 0,
  y: 0,
  width: '100%',
  height: '100%'
};
function fillBlack(abstract) {
  let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = 'black';
  }
  return abstract;
}
function deGroup(abstract) {
  if (abstract.tag === 'g') {
    return abstract.children;
  } else {
    return [abstract];
  }
}
var Masks = {
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const maskData = node.getAttribute('data-fa-mask');
        const mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(i => i.trim()));
        if (!mask.prefix) {
          mask.prefix = getDefaultUsablePrefix();
        }
        accumulator.mask = mask;
        accumulator.maskId = node.getAttribute('data-fa-mask-id');
        return accumulator;
      }
    };
  },
  provides(providers) {
    providers.generateAbstractMask = function (_ref) {
      let {
        children,
        attributes,
        main,
        mask,
        maskId: explicitMaskId,
        transform
      } = _ref;
      const {
        width: mainWidth,
        icon: mainPath
      } = main;
      const {
        width: maskWidth,
        icon: maskPath
      } = mask;
      const trans = transformForSvg({
        transform,
        containerWidth: maskWidth,
        iconWidth: mainWidth
      });
      const maskRect = {
        tag: 'rect',
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          fill: 'white'
        })
      };
      const maskInnerGroupChildrenMixin = mainPath.children ? {
        children: mainPath.children.map(fillBlack)
      } : {};
      const maskInnerGroup = {
        tag: 'g',
        attributes: _objectSpread2$1({}, trans.inner),
        children: [fillBlack(_objectSpread2$1({
          tag: mainPath.tag,
          attributes: _objectSpread2$1(_objectSpread2$1({}, mainPath.attributes), trans.path)
        }, maskInnerGroupChildrenMixin))]
      };
      const maskOuterGroup = {
        tag: 'g',
        attributes: _objectSpread2$1({}, trans.outer),
        children: [maskInnerGroup]
      };
      const maskId = "mask-".concat(explicitMaskId || nextUniqueId());
      const clipId = "clip-".concat(explicitMaskId || nextUniqueId());
      const maskTag = {
        tag: 'mask',
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          id: maskId,
          maskUnits: 'userSpaceOnUse',
          maskContentUnits: 'userSpaceOnUse'
        }),
        children: [maskRect, maskOuterGroup]
      };
      const defs = {
        tag: 'defs',
        children: [{
          tag: 'clipPath',
          attributes: {
            id: clipId
          },
          children: deGroup(maskPath)
        }, maskTag]
      };
      children.push(defs, {
        tag: 'rect',
        attributes: _objectSpread2$1({
          fill: 'currentColor',
          'clip-path': "url(#".concat(clipId, ")"),
          mask: "url(#".concat(maskId, ")")
        }, ALL_SPACE)
      });
      return {
        children,
        attributes
      };
    };
  }
};

var MissingIconIndicator = {
  provides(providers) {
    let reduceMotion = false;
    if (WINDOW.matchMedia) {
      reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    providers.missingIconAbstract = function () {
      const gChildren = [];
      const FILL = {
        fill: 'currentColor'
      };
      const ANIMATION_BASE = {
        attributeType: 'XML',
        repeatCount: 'indefinite',
        dur: '2s'
      };

      // Ring
      gChildren.push({
        tag: 'path',
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
        })
      });
      const OPACITY_ANIMATE = _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
        attributeName: 'opacity'
      });
      const dot = {
        tag: 'circle',
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          cx: '256',
          cy: '364',
          r: '28'
        }),
        children: []
      };
      if (!reduceMotion) {
        dot.children.push({
          tag: 'animate',
          attributes: _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
            attributeName: 'r',
            values: '28;14;28;28;14;28;'
          })
        }, {
          tag: 'animate',
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: '1;0;1;1;0;1;'
          })
        });
      }
      gChildren.push(dot);
      gChildren.push({
        tag: 'path',
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          opacity: '1',
          d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
        }),
        children: reduceMotion ? [] : [{
          tag: 'animate',
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: '1;0;0;0;0;1;'
          })
        }]
      });
      if (!reduceMotion) {
        // Exclamation
        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
            opacity: '0',
            d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
          }),
          children: [{
            tag: 'animate',
            attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
              values: '0;0;1;1;0;0;'
            })
          }]
        });
      }
      return {
        tag: 'g',
        attributes: {
          'class': 'missing'
        },
        children: gChildren
      };
    };
  }
};

var SvgSymbols = {
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const symbolData = node.getAttribute('data-fa-symbol');
        const symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
        accumulator['symbol'] = symbol;
        return accumulator;
      }
    };
  }
};

var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];

registerPlugins(plugins, {
  mixoutsTo: api
});
api.noAuto;
api.config;
api.library;
api.dom;
const parse$1 = api.parse;
api.findIconDefinition;
api.toHtml;
const icon = api.icon;
api.layer;
api.text;
api.counter;

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min () {
	if (hasRequiredReactIs_production_min) return reactIs_production_min;
	hasRequiredReactIs_production_min = 1;
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
	reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
	reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
	reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;
	return reactIs_production_min;
}

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development () {
	if (hasRequiredReactIs_development) return reactIs_development;
	hasRequiredReactIs_development = 1;



	if (process.env.NODE_ENV !== "production") {
	  (function() {

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	reactIs_development.AsyncMode = AsyncMode;
	reactIs_development.ConcurrentMode = ConcurrentMode;
	reactIs_development.ContextConsumer = ContextConsumer;
	reactIs_development.ContextProvider = ContextProvider;
	reactIs_development.Element = Element;
	reactIs_development.ForwardRef = ForwardRef;
	reactIs_development.Fragment = Fragment;
	reactIs_development.Lazy = Lazy;
	reactIs_development.Memo = Memo;
	reactIs_development.Portal = Portal;
	reactIs_development.Profiler = Profiler;
	reactIs_development.StrictMode = StrictMode;
	reactIs_development.Suspense = Suspense;
	reactIs_development.isAsyncMode = isAsyncMode;
	reactIs_development.isConcurrentMode = isConcurrentMode;
	reactIs_development.isContextConsumer = isContextConsumer;
	reactIs_development.isContextProvider = isContextProvider;
	reactIs_development.isElement = isElement;
	reactIs_development.isForwardRef = isForwardRef;
	reactIs_development.isFragment = isFragment;
	reactIs_development.isLazy = isLazy;
	reactIs_development.isMemo = isMemo;
	reactIs_development.isPortal = isPortal;
	reactIs_development.isProfiler = isProfiler;
	reactIs_development.isStrictMode = isStrictMode;
	reactIs_development.isSuspense = isSuspense;
	reactIs_development.isValidElementType = isValidElementType;
	reactIs_development.typeOf = typeOf;
	  })();
	}
	return reactIs_development;
}

var hasRequiredReactIs;

function requireReactIs () {
	if (hasRequiredReactIs) return reactIs.exports;
	hasRequiredReactIs = 1;

	if (process.env.NODE_ENV === 'production') {
	  reactIs.exports = requireReactIs_production_min();
	} else {
	  reactIs.exports = requireReactIs_development();
	}
	return reactIs.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return objectAssign;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;

function requireReactPropTypesSecret () {
	if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
	hasRequiredReactPropTypesSecret = 1;

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	ReactPropTypesSecret_1 = ReactPropTypesSecret;
	return ReactPropTypesSecret_1;
}

var has;
var hasRequiredHas;

function requireHas () {
	if (hasRequiredHas) return has;
	hasRequiredHas = 1;
	has = Function.call.bind(Object.prototype.hasOwnProperty);
	return has;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var checkPropTypes_1;
var hasRequiredCheckPropTypes;

function requireCheckPropTypes () {
	if (hasRequiredCheckPropTypes) return checkPropTypes_1;
	hasRequiredCheckPropTypes = 1;

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret = requireReactPropTypesSecret();
	  var loggedTypeFailures = {};
	  var has = requireHas();

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) { /**/ }
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
	              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	};

	checkPropTypes_1 = checkPropTypes;
	return checkPropTypes_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;

function requireFactoryWithTypeCheckers () {
	if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
	hasRequiredFactoryWithTypeCheckers = 1;

	var ReactIs = requireReactIs();
	var assign = requireObjectAssign();

	var ReactPropTypesSecret = requireReactPropTypesSecret();
	var has = requireHas();
	var checkPropTypes = requireCheckPropTypes();

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bigint: createPrimitiveTypeChecker('bigint'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message, data) {
	    this.message = message;
	    this.data = data && typeof data === 'object' ? data: {};
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError(
	          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
	          {expectedType: expectedType}
	        );
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var expectedTypes = [];
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
	        if (checkerResult == null) {
	          return null;
	        }
	        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
	          expectedTypes.push(checkerResult.data.expectedType);
	        }
	      }
	      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function invalidValidatorError(componentName, location, propFullName, key, type) {
	    return new PropTypeError(
	      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
	      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
	    );
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (has(shapeTypes, key) && typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithTypeCheckers;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;

function requireFactoryWithThrowingShims () {
	if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
	hasRequiredFactoryWithThrowingShims = 1;

	var ReactPropTypesSecret = requireReactPropTypesSecret();

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	factoryWithThrowingShims = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  }	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithThrowingShims;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = requireReactIs();

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  propTypes.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = requireFactoryWithThrowingShims()();
}

var propTypesExports = propTypes.exports;
var PropTypes = /*@__PURE__*/getDefaultExportFromCjs(propTypesExports);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// Get CSS class list from a props object
function classList(props) {
  var _classes;

  var beat = props.beat,
      fade = props.fade,
      beatFade = props.beatFade,
      bounce = props.bounce,
      shake = props.shake,
      flash = props.flash,
      spin = props.spin,
      spinPulse = props.spinPulse,
      spinReverse = props.spinReverse,
      pulse = props.pulse,
      fixedWidth = props.fixedWidth,
      inverse = props.inverse,
      border = props.border,
      listItem = props.listItem,
      flip = props.flip,
      size = props.size,
      rotation = props.rotation,
      pull = props.pull; // map of CSS class names to properties

  var classes = (_classes = {
    'fa-beat': beat,
    'fa-fade': fade,
    'fa-beat-fade': beatFade,
    'fa-bounce': bounce,
    'fa-shake': shake,
    'fa-flash': flash,
    'fa-spin': spin,
    'fa-spin-reverse': spinReverse,
    'fa-spin-pulse': spinPulse,
    'fa-pulse': pulse,
    'fa-fw': fixedWidth,
    'fa-inverse': inverse,
    'fa-border': border,
    'fa-li': listItem,
    'fa-flip': flip === true,
    'fa-flip-horizontal': flip === 'horizontal' || flip === 'both',
    'fa-flip-vertical': flip === 'vertical' || flip === 'both'
  }, _defineProperty(_classes, "fa-".concat(size), typeof size !== 'undefined' && size !== null), _defineProperty(_classes, "fa-rotate-".concat(rotation), typeof rotation !== 'undefined' && rotation !== null && rotation !== 0), _defineProperty(_classes, "fa-pull-".concat(pull), typeof pull !== 'undefined' && pull !== null), _defineProperty(_classes, 'fa-swap-opacity', props.swapOpacity), _classes); // map over all the keys in the classes object
  // return an array of the keys where the value for the key is not null

  return Object.keys(classes).map(function (key) {
    return classes[key] ? key : null;
  }).filter(function (key) {
    return key;
  });
}

// Camelize taken from humps
// humps is copyright © 2012+ Dom Christie
// Released under the MIT license.
// Performant way to determine if object coerces to a number
function _isNumerical(obj) {
  obj = obj - 0; // eslint-disable-next-line no-self-compare

  return obj === obj;
}

function camelize(string) {
  if (_isNumerical(string)) {
    return string;
  } // eslint-disable-next-line no-useless-escape


  string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : '';
  }); // Ensure 1st char is always lowercase

  return string.substr(0, 1).toLowerCase() + string.substr(1);
}

var _excluded = ["style"];

function capitalize(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function styleToObject(style) {
  return style.split(';').map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s;
  }).reduce(function (acc, pair) {
    var i = pair.indexOf(':');
    var prop = camelize(pair.slice(0, i));
    var value = pair.slice(i + 1).trim();
    prop.startsWith('webkit') ? acc[capitalize(prop)] = value : acc[prop] = value;
    return acc;
  }, {});
}

function convert(createElement, element) {
  var extraProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof element === 'string') {
    return element;
  }

  var children = (element.children || []).map(function (child) {
    return convert(createElement, child);
  });
  /* eslint-disable dot-notation */

  var mixins = Object.keys(element.attributes || {}).reduce(function (acc, key) {
    var val = element.attributes[key];

    switch (key) {
      case 'class':
        acc.attrs['className'] = val;
        delete element.attributes['class'];
        break;

      case 'style':
        acc.attrs['style'] = styleToObject(val);
        break;

      default:
        if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0) {
          acc.attrs[key.toLowerCase()] = val;
        } else {
          acc.attrs[camelize(key)] = val;
        }

    }

    return acc;
  }, {
    attrs: {}
  });

  var _extraProps$style = extraProps.style,
      existingStyle = _extraProps$style === void 0 ? {} : _extraProps$style,
      remaining = _objectWithoutProperties(extraProps, _excluded);

  mixins.attrs['style'] = _objectSpread2(_objectSpread2({}, mixins.attrs['style']), existingStyle);
  /* eslint-enable */

  return createElement.apply(void 0, [element.tag, _objectSpread2(_objectSpread2({}, mixins.attrs), remaining)].concat(_toConsumableArray(children)));
}

var PRODUCTION = false;

try {
  PRODUCTION = process.env.NODE_ENV === 'production';
} catch (e) {}

function log () {
  if (!PRODUCTION && console && typeof console.error === 'function') {
    var _console;

    (_console = console).error.apply(_console, arguments);
  }
}

function normalizeIconArgs(icon) {
  // this has everything that it needs to be rendered which means it was probably imported
  // directly from an icon svg package
  if (icon && _typeof(icon) === 'object' && icon.prefix && icon.iconName && icon.icon) {
    return icon;
  }

  if (parse$1.icon) {
    return parse$1.icon(icon);
  } // if the icon is null, there's nothing to do


  if (icon === null) {
    return null;
  } // if the icon is an object and has a prefix and an icon name, return it


  if (icon && _typeof(icon) === 'object' && icon.prefix && icon.iconName) {
    return icon;
  } // if it's an array with length of two


  if (Array.isArray(icon) && icon.length === 2) {
    // use the first item as prefix, second as icon name
    return {
      prefix: icon[0],
      iconName: icon[1]
    };
  } // if it's a string, use it as the icon name


  if (typeof icon === 'string') {
    return {
      prefix: 'fas',
      iconName: icon
    };
  }
}

// creates an object with a key of key
// and a value of value
// if certain conditions are met
function objectWithKey(key, value) {
  // if the value is a non-empty array
  // or it's not an array but it is truthy
  // then create the object with the key and the value
  // if not, return an empty array
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty({}, key, value) : {};
}

var defaultProps = {
  border: false,
  className: '',
  mask: null,
  maskId: null,
  fixedWidth: false,
  inverse: false,
  flip: false,
  icon: null,
  listItem: false,
  pull: null,
  pulse: false,
  rotation: null,
  size: null,
  spin: false,
  spinPulse: false,
  spinReverse: false,
  beat: false,
  fade: false,
  beatFade: false,
  bounce: false,
  shake: false,
  symbol: false,
  title: '',
  titleId: null,
  transform: null,
  swapOpacity: false
};
var FontAwesomeIcon = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var allProps = _objectSpread2(_objectSpread2({}, defaultProps), props);

  var iconArgs = allProps.icon,
      maskArgs = allProps.mask,
      symbol = allProps.symbol,
      className = allProps.className,
      title = allProps.title,
      titleId = allProps.titleId,
      maskId = allProps.maskId;
  var iconLookup = normalizeIconArgs(iconArgs);
  var classes = objectWithKey('classes', [].concat(_toConsumableArray(classList(allProps)), _toConsumableArray((className || '').split(' '))));
  var transform = objectWithKey('transform', typeof allProps.transform === 'string' ? parse$1.transform(allProps.transform) : allProps.transform);
  var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  var renderedIcon = icon(iconLookup, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, classes), transform), mask), {}, {
    symbol: symbol,
    title: title,
    titleId: titleId,
    maskId: maskId
  }));

  if (!renderedIcon) {
    log('Could not find icon', iconLookup);
    return null;
  }

  var abstract = renderedIcon.abstract;
  var extraProps = {
    ref: ref
  };
  Object.keys(allProps).forEach(function (key) {
    // eslint-disable-next-line no-prototype-builtins
    if (!defaultProps.hasOwnProperty(key)) {
      extraProps[key] = allProps[key];
    }
  });
  return convertCurry(abstract[0], extraProps);
});
FontAwesomeIcon.displayName = 'FontAwesomeIcon';
FontAwesomeIcon.propTypes = {
  beat: PropTypes.bool,
  border: PropTypes.bool,
  beatFade: PropTypes.bool,
  bounce: PropTypes.bool,
  className: PropTypes.string,
  fade: PropTypes.bool,
  flash: PropTypes.bool,
  mask: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  maskId: PropTypes.string,
  fixedWidth: PropTypes.bool,
  inverse: PropTypes.bool,
  flip: PropTypes.oneOf([true, false, 'horizontal', 'vertical', 'both']),
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  listItem: PropTypes.bool,
  pull: PropTypes.oneOf(['right', 'left']),
  pulse: PropTypes.bool,
  rotation: PropTypes.oneOf([0, 90, 180, 270]),
  shake: PropTypes.bool,
  size: PropTypes.oneOf(['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']),
  spin: PropTypes.bool,
  spinPulse: PropTypes.bool,
  spinReverse: PropTypes.bool,
  symbol: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.string,
  titleId: PropTypes.string,
  transform: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  swapOpacity: PropTypes.bool
};
var convertCurry = convert.bind(null, React.createElement);

const AppLayout = ({
  title = 'Dashboard',
  icon,
  children,
  user,
  menuItems = [],
  teams = [],
  currentTeam,
  onLogout,
  onTeamSwitch
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gray-100 flex flex-col"
  }, /*#__PURE__*/React.createElement(Navigation, {
    user: user,
    menuItems: menuItems,
    teams: teams,
    currentTeam: currentTeam,
    onLogout: onLogout,
    onTeamSwitch: onTeamSwitch
  }), title && /*#__PURE__*/React.createElement("header", {
    className: "bg-white ml-48 mt-4 shadow w-fit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:px-6 lg:px-8 inline-flex items-center"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: icon ? ['fas', icon] : ['far', 'circle-question'],
    className: "mr-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "inline-block"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-semibold text-xl text-gray-800 leading-tight"
  }, title)))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement(MainContent, null, children)), /*#__PURE__*/React.createElement(Footer, null));
};

exports.ActionButtons = ActionButtons;
exports.Alert = Alert;
exports.AnimatedText = AnimatedText;
exports.AppLayout = AppLayout;
exports.Badge = Badge;
exports.Box = Box;
exports.Button = Button;
exports.Card = Card;
exports.CategoryForm = CategoryForm;
exports.CategorySelector = CategorySelector;
exports.Checkbox = Checkbox;
exports.Container = Container;
exports.ContentBox = ContentBox;
exports.Dropdown = Dropdown;
exports.EscapeButton = EscapeButton;
exports.FileField = FileField;
exports.FileInput = FileInput;
exports.FlashcardFlip = FlashcardFlip;
exports.FlashcardForm = FlashcardForm;
exports.FlashcardList = FlashcardList;
exports.FlashcardSlider = FlashcardSlider;
exports.Footer = Footer;
exports.FormField = FormField;
exports.FormGroup = FormGroup;
exports.FullScreenLoader = FullScreenLoader;
exports.GameActionButton = Button;
exports.GameButton = Button;
exports.GameCard = GameCard;
exports.GameContainer = GameContainer;
exports.GameIcon = Icon;
exports.GameImage = Image$1;
exports.GameProgressBar = GameProgressBar;
exports.Icon = Icon;
exports.IconButton = IconButton;
exports.Image = Image$1;
exports.ImagePreview = Image$1;
exports.ImageUploadField = ImageUploadField;
exports.Input = Input;
exports.Label = Label;
exports.Logo = Logo;
exports.MainContent = MainContent;
exports.MotivationalMessage = MotivationalMessage;
exports.NavLink = NavLink;
exports.Navigation = Navigation;
exports.NavigationMenu = NavigationMenu;
exports.Overlay = Overlay;
exports.PageHeader = PageHeader;
exports.PercentageCard = PercentageCard;
exports.ResultCard = ResultCard;
exports.SearchBar = SearchBar;
exports.SearchInput = SearchInput;
exports.SelectFlashCard = SelectFlashCard;
exports.Tab = Tab;
exports.TabBar = TabBar;
exports.TeamDropdown = TeamDropdown$1;
exports.TextArea = TextArea;
exports.TextAreaField = TextAreaField;
exports.Title = Title;
exports.ToggleButton = ToggleButton;
exports.UserDropdown = UserDropdown$1;
//# sourceMappingURL=index.js.map
