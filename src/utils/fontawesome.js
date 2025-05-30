// src/utils/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';

// Importar iconos sólidos
import {
    faHeart,
    faHome,
    faUser,
    faSearch,
    faCheckCircle,
    faExclamationTriangle,
    faTimesCircle,
    faInfoCircle,
    faSpinner,
    faStar,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faArrowDown,
    faBars,
    faTimes,
    faEdit,
    faTrash,
    faSave,
    faCopy,
    faCheck,
    faEnvelope,
    faPhone,
    faComment,
    faBell,
    faFile,
    faFolder,
    faDownload,
    faUpload,
    faCog,
    faUsers,
    faFilter,
    faSort,
    faQuestion,
    faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

// Importar iconos regulares
import {
    faHeart as farHeart,
    faUser as farUser,
    faCheckCircle as farCheckCircle
} from '@fortawesome/free-regular-svg-icons';

// Importar iconos de marcas
import {
    faGithub,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons';

// Registrar todos los iconos en la librería
library.add(
    // Sólidos
    faHeart,
    faHome,
    faUser,
    faSearch,
    faCheckCircle,
    faExclamationTriangle,
    faTimesCircle,
    faInfoCircle,
    faSpinner,
    faStar,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faArrowDown,
    faBars,
    faTimes,
    faEdit,
    faTrash,
    faSave,
    faCopy,
    faCheck,
    faEnvelope,
    faPhone,
    faComment,
    faBell,
    faFile,
    faFolder,
    faDownload,
    faUpload,
    faCog,
    faUsers,
    faFilter,
    faSort,
    faQuestion,
    faQuestionCircle,

    // Regulares
    farHeart,
    farUser,
    farCheckCircle,

    // Marcas
    faGithub,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin
);