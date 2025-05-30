// ===== CATEGORÍAS PRINCIPALES =====
export const ANIMATED_CATEGORIES = {
    entrances: {
        label: 'Entradas',
        description: 'Animaciones de entrada de elementos'
    },
    exits: {
        label: 'Salidas',
        description: 'Animaciones de salida de elementos'
    },
    attention: {
        label: 'Atención',
        description: 'Animaciones para llamar la atención'
    },
    text: {
        label: 'Texto',
        description: 'Animaciones específicas para texto'
    },
    background: {
        label: 'Fondo',
        description: 'Animaciones de fondo'
    },
    special: {
        label: 'Especiales',
        description: 'Efectos especiales y únicos'
    }
};

// ===== ANIMACIONES DE ENTRADA (ENTRANCES) =====
export const ENTRANCE_ANIMATIONS = {
    // FADE ENTRANCES
    fadeIn: 'fade-in',
    fadeInTop: 'fade-in-top',
    fadeInBottom: 'fade-in-bottom',
    fadeInLeft: 'fade-in-left',
    fadeInRight: 'fade-in-right',
    fadeInTopLeft: 'fade-in-top-left',
    fadeInTopRight: 'fade-in-top-right',
    fadeInBottomLeft: 'fade-in-bottom-left',
    fadeInBottomRight: 'fade-in-bottom-right',
    fadeInBig: 'fade-in-big',
    fadeInDown: 'fade-in-down',
    fadeInDownBig: 'fade-in-down-big',
    fadeInUp: 'fade-in-up',
    fadeInUpBig: 'fade-in-up-big',

    // SCALE ENTRANCES
    scaleIn: 'scale-in-center',
    scaleInTop: 'scale-in-top',
    scaleInBottom: 'scale-in-bottom',
    scaleInLeft: 'scale-in-left',
    scaleInRight: 'scale-in-right',
    scaleInTopLeft: 'scale-in-top-left',
    scaleInTopRight: 'scale-in-top-right',
    scaleInBottomLeft: 'scale-in-bottom-left',
    scaleInBottomRight: 'scale-in-bottom-right',
    scaleInHor: 'scale-in-hor-center',
    scaleInVer: 'scale-in-ver-center',

    // SLIDE ENTRANCES
    slideIn: 'slide-in-center',
    slideInTop: 'slide-in-top',
    slideInBottom: 'slide-in-bottom',
    slideInLeft: 'slide-in-left',
    slideInRight: 'slide-in-right',
    slideInBlurredTop: 'slide-in-blurred-top',
    slideInBlurredBottom: 'slide-in-blurred-bottom',
    slideInBlurredLeft: 'slide-in-blurred-left',
    slideInBlurredRight: 'slide-in-blurred-right',
    slideInEllipticTop: 'slide-in-elliptic-top-fwd',
    slideInEllipticBottom: 'slide-in-elliptic-bottom-fwd',

    // ROTATE ENTRANCES
    rotateIn: 'rotate-in-center',
    rotateInLeft: 'rotate-in-left',
    rotateInRight: 'rotate-in-right',
    rotateInTop: 'rotate-in-top',
    rotateInBottom: 'rotate-in-bottom',
    rotateInDiag1: 'rotate-in-diag-1',
    rotateInDiag2: 'rotate-in-diag-2',
    rotateInHor: 'rotate-in-hor',
    rotateInVer: 'rotate-in-ver',

    // BOUNCE ENTRANCES
    bounceIn: 'bounce-in-center',
    bounceInTop: 'bounce-in-top',
    bounceInBottom: 'bounce-in-bottom',
    bounceInLeft: 'bounce-in-left',
    bounceInRight: 'bounce-in-right',
    bounceInFwd: 'bounce-in-fwd',
    bounceInBck: 'bounce-in-bck',

    // PUFF ENTRANCES
    puffIn: 'puff-in-center',
    puffInTop: 'puff-in-top',
    puffInBottom: 'puff-in-bottom',
    puffInLeft: 'puff-in-left',
    puffInRight: 'puff-in-right',
    puffInHor: 'puff-in-hor',
    puffInVer: 'puff-in-ver',

    // FLIP ENTRANCES
    flipIn: 'flip-in-hor-bottom',
    flipInTop: 'flip-in-hor-top',
    flipInLeft: 'flip-in-ver-left',
    flipInRight: 'flip-in-ver-right',
    flipInDiag1: 'flip-in-diag-1-tr',
    flipInDiag2: 'flip-in-diag-2-tl',

    // SWING ENTRANCES
    swingIn: 'swing-in-top-fwd',
    swingInBottom: 'swing-in-bottom-fwd',
    swingInLeft: 'swing-in-left-fwd',
    swingInRight: 'swing-in-right-fwd',

    // ROLL ENTRANCES
    rollIn: 'roll-in-left',
    rollInRight: 'roll-in-right',
    rollInTop: 'roll-in-top',
    rollInBottom: 'roll-in-bottom',
    rollInBlurred: 'roll-in-blurred-left',

    // TILT ENTRANCES
    tiltIn: 'tilt-in-fwd-tr',
    tiltInLeft: 'tilt-in-fwd-tl',
    tiltInBottom: 'tilt-in-fwd-br',
    tiltInRight: 'tilt-in-fwd-bl',

    // KENBURNS ENTRANCES
    kenburnsTop: 'kenburns-top',
    kenburnsBottom: 'kenburns-bottom',
    kenburnsLeft: 'kenburns-left',
    kenburnsRight: 'kenburns-right',

    // SLIT ENTRANCES
    slitIn: 'slit-in-vertical',
    slitInHorizontal: 'slit-in-horizontal',
    slitInDiag1: 'slit-in-diagonal-1',
    slitInDiag2: 'slit-in-diagonal-2'
};

// ===== ANIMACIONES DE SALIDA (EXITS) =====
export const EXIT_ANIMATIONS = {
    // FADE EXITS
    fadeOut: 'fade-out',
    fadeOutTop: 'fade-out-top',
    fadeOutBottom: 'fade-out-bottom',
    fadeOutLeft: 'fade-out-left',
    fadeOutRight: 'fade-out-right',
    fadeOutTopLeft: 'fade-out-top-left',
    fadeOutTopRight: 'fade-out-top-right',
    fadeOutBottomLeft: 'fade-out-bottom-left',
    fadeOutBottomRight: 'fade-out-bottom-right',
    fadeOutBig: 'fade-out-big',
    fadeOutDown: 'fade-out-down',
    fadeOutDownBig: 'fade-out-down-big',
    fadeOutUp: 'fade-out-up',
    fadeOutUpBig: 'fade-out-up-big',

    // SCALE EXITS
    scaleOut: 'scale-out-center',
    scaleOutTop: 'scale-out-top',
    scaleOutBottom: 'scale-out-bottom',
    scaleOutLeft: 'scale-out-left',
    scaleOutRight: 'scale-out-right',
    scaleOutHor: 'scale-out-horizontal',
    scaleOutVer: 'scale-out-vertical',

    // SLIDE EXITS
    slideOut: 'slide-out-center',
    slideOutTop: 'slide-out-top',
    slideOutBottom: 'slide-out-bottom',
    slideOutLeft: 'slide-out-left',
    slideOutRight: 'slide-out-right',
    slideOutBlurredTop: 'slide-out-blurred-top',
    slideOutBlurredBottom: 'slide-out-blurred-bottom',
    slideOutBlurredLeft: 'slide-out-blurred-left',
    slideOutBlurredRight: 'slide-out-blurred-right',

    // ROTATE EXITS
    rotateOut: 'rotate-out-center',
    rotateOutLeft: 'rotate-out-left',
    rotateOutRight: 'rotate-out-right',
    rotateOutTop: 'rotate-out-top',
    rotateOutBottom: 'rotate-out-bottom',
    rotateOutDiag1: 'rotate-out-diag-1',
    rotateOutDiag2: 'rotate-out-diag-2',

    // BOUNCE EXITS
    bounceOut: 'bounce-out-center',
    bounceOutTop: 'bounce-out-top',
    bounceOutBottom: 'bounce-out-bottom',
    bounceOutLeft: 'bounce-out-left',
    bounceOutRight: 'bounce-out-right',

    // PUFF EXITS
    puffOut: 'puff-out-center',
    puffOutTop: 'puff-out-top',
    puffOutBottom: 'puff-out-bottom',
    puffOutLeft: 'puff-out-left',
    puffOutRight: 'puff-out-right',

    // FLIP EXITS
    flipOut: 'flip-out-hor-bottom',
    flipOutTop: 'flip-out-hor-top',
    flipOutLeft: 'flip-out-ver-left',
    flipOutRight: 'flip-out-ver-right',

    // SWING EXITS
    swingOut: 'swing-out-top-fwd',
    swingOutBottom: 'swing-out-bottom-fwd',
    swingOutLeft: 'swing-out-left-fwd',
    swingOutRight: 'swing-out-right-fwd',

    // ROLL EXITS
    rollOut: 'roll-out-left',
    rollOutRight: 'roll-out-right',
    rollOutTop: 'roll-out-top',
    rollOutBottom: 'roll-out-bottom',

    // TILT EXITS
    tiltOut: 'tilt-out-fwd-tr',
    tiltOutLeft: 'tilt-out-fwd-tl',
    tiltOutBottom: 'tilt-out-fwd-br',
    tiltOutRight: 'tilt-out-fwd-bl'
};

// ===== ANIMACIONES DE ATENCIÓN (ATTENTION) =====
export const ATTENTION_ANIMATIONS = {
    // BOUNCE ATTENTION
    bounce: 'bounce-top',
    bounceBottom: 'bounce-bottom',
    bounceLeft: 'bounce-left',
    bounceRight: 'bounce-right',

    // FLASH & PULSE
    flash: 'flash',
    pulse: 'pulse-1',
    pulse2: 'pulse-2',
    pulsate: 'pulsate-1',
    pulsateBck: 'pulsate-bck',
    pulsateFwd: 'pulsate-fwd',

    // SHAKE
    shake: 'shake-horizontal',
    shakeVertical: 'shake-vertical',
    shakeLR: 'shake-lr',
    shakeTB: 'shake-tb',
    shakeTL: 'shake-tl',
    shakeTR: 'shake-tr',
    shakeBL: 'shake-bl',
    shakeBR: 'shake-br',

    // VIBRATE
    vibrate: 'vibrate-1',
    vibrate2: 'vibrate-2',
    vibrate3: 'vibrate-3',

    // WOBBLE
    wobble: 'wobble-hor-bottom',
    wobbleTop: 'wobble-hor-top',
    wobbleLeft: 'wobble-ver-left',
    wobbleRight: 'wobble-ver-right',

    // JELLO
    jello: 'jello-horizontal',
    jelloVertical: 'jello-vertical',
    jelloDiag1: 'jello-diagonal-1',
    jelloDiag2: 'jello-diagonal-2',

    // HEARTBEAT
    heartbeat: 'heartbeat',

    // SWING
    swing: 'swing',

    // RUBBER BAND
    rubberBand: 'rubber-band',

    // TADA
    tada: 'tada',

    // HEAD SHAKE
    headShake: 'head-shake',

    // BLINK
    blink: 'blink-1',
    blink2: 'blink-2',

    // FOCUS
    focusIn: 'focus-in-expand',
    focusInContract: 'focus-in-contract',
    focusInContractBck: 'focus-in-contract-bck',

    // SHADOW
    shadowDrop: 'shadow-drop-center',
    shadowDropTop: 'shadow-drop-top',
    shadowDropBottom: 'shadow-drop-bottom',
    shadowDropLeft: 'shadow-drop-left',
    shadowDropRight: 'shadow-drop-right',
    shadowInset: 'shadow-inset-center',

    // GLOW
    glow: 'glow',

    // FLICKER
    flicker: 'flicker-1',
    flicker2: 'flicker-2',
    flicker3: 'flicker-3',
    flicker4: 'flicker-4'
};

// ===== ANIMACIONES DE TEXTO (TEXT) =====
export const TEXT_ANIMATIONS = {
    // TRACKING
    trackingIn: 'tracking-in-expand',
    trackingInContract: 'tracking-in-contract',
    trackingOut: 'tracking-out-expand',
    trackingOutContract: 'tracking-out-contract',

    // TEXT FOCUS
    textFocusIn: 'text-focus-in',
    textFocusOut: 'text-focus-out',

    // TEXT SHADOW
    textShadowDrop: 'text-shadow-drop-center',
    textShadowDropTop: 'text-shadow-drop-top',
    textShadowDropBottom: 'text-shadow-drop-bottom',
    textShadowDropLeft: 'text-shadow-drop-left',
    textShadowDropRight: 'text-shadow-drop-right',

    // TEXT BLUR
    textBlurOut: 'text-blur-out',

    // TEXT FLICKER
    textFlicker: 'text-flicker-in-glow',
    textFlickerOut: 'text-flicker-out-glow',

    // TEXT POP
    textPopUp: 'text-pop-up-top',
    textPopUpBottom: 'text-pop-up-bottom',
    textPopUpLeft: 'text-pop-up-left',
    textPopUpRight: 'text-pop-up-right',

    // TYPEWRITER
    typewriter: 'typewriter'
};

// ===== ANIMACIONES DE FONDO (BACKGROUND) =====
export const BACKGROUND_ANIMATIONS = {
    // BACKGROUND SLIDE
    bgSlideLeft: 'bg-slide-left',
    bgSlideRight: 'bg-slide-right',
    bgSlideTop: 'bg-slide-top',
    bgSlideBottom: 'bg-slide-bottom',

    // BACKGROUND PAN
    bgPanLeft: 'bg-pan-left',
    bgPanRight: 'bg-pan-right',
    bgPanTop: 'bg-pan-top',
    bgPanBottom: 'bg-pan-bottom',

    // BACKGROUND CIRCLE
    bgCircle: 'bg-circle',

    // KENBURNS
    kenburns: 'kenburns-center',
    kenburnsTop: 'kenburns-top',
    kenburnsBottom: 'kenburns-bottom',
    kenburnsLeft: 'kenburns-left',
    kenburnsRight: 'kenburns-right'
};

// ===== ANIMACIONES ESPECIALES (SPECIAL) =====
export const SPECIAL_ANIMATIONS = {
    // MORPHING
    morph: 'morph',

    // MAGIC
    magic: 'magic',

    // TWISTER
    twisterIn: 'twister-in-fwd',
    twisterOut: 'twister-out-fwd',

    // SPACE
    spaceIn: 'space-in-up',
    spaceOut: 'space-out-up',

    // PERSPECTIVE
    perspectiveIn: 'perspective-in',
    perspectiveOut: 'perspective-out',

    // MATRIX
    matrix: 'matrix',

    // GLITCH
    glitch: 'glitch',

    // NEON
    neonFlicker: 'neon-flicker',

    // HOLOGRAM
    hologram: 'hologram',

    // CYBERPUNK
    cyberpunk: 'cyberpunk-glow'
};

// ===== CONFIGURACIÓN COMPLETA DE ANIMACIONES =====
export const ALL_ANIMATIONS = {
    ...ENTRANCE_ANIMATIONS,
    ...EXIT_ANIMATIONS,
    ...ATTENTION_ANIMATIONS,
    ...TEXT_ANIMATIONS,
    ...BACKGROUND_ANIMATIONS,
    ...SPECIAL_ANIMATIONS
};

// ===== PRESETS DE CONFIGURACIÓN =====
export const ANIMATION_PRESETS = {
    quick: { duration: 0.3, easing: 'ease-out' },
    normal: { duration: 0.6, easing: 'ease' },
    slow: { duration: 1.2, easing: 'ease-in-out' },
    bouncy: { duration: 0.8, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
    elastic: { duration: 1.0, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
    dramatic: { duration: 2.0, easing: 'ease-in-out' }
};

// ===== CONTEO TOTAL =====
export const ANIMATION_COUNTS = {
    entrances: Object.keys(ENTRANCE_ANIMATIONS).length,
    exits: Object.keys(EXIT_ANIMATIONS).length,
    attention: Object.keys(ATTENTION_ANIMATIONS).length,
    text: Object.keys(TEXT_ANIMATIONS).length,
    background: Object.keys(BACKGROUND_ANIMATIONS).length,
    special: Object.keys(SPECIAL_ANIMATIONS).length,
    total: Object.keys(ALL_ANIMATIONS).length
};
