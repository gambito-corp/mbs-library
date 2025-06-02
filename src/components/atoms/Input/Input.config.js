import Input from './Input.jsx';

export const InputConfig = {
    component: Input,
    name: 'Input',
    category: 'atoms',
    description: 'Componente de input completo con iconos, labels, estados y múltiples tipos',

    variants: [
        {
            name: 'Input básico',
            description: 'Campo de texto básico',
            code: `<Input placeholder="Nombre" />`,
            props: {
                placeholder: 'Nombre'
            }
        },
        {
            name: 'Input con label',
            description: 'Campo con etiqueta',
            code: `<Input label="Email" placeholder="tu@email.com" />`,
            props: {
                label: 'Email',
                placeholder: 'tu@email.com'
            }
        },
        {
            name: 'Input con icono',
            description: 'Campo con icono a la izquierda',
            code: `<Input label="Email" icon="envelope" placeholder="tu@email.com" />`,
            props: {
                label: 'Email',
                icon: 'envelope',
                placeholder: 'tu@email.com'
            }
        },
        {
            name: 'Input con icono derecha',
            description: 'Campo con icono a la derecha',
            code: `<Input label="Búsqueda" icon="search" iconPosition="right" placeholder="Buscar..." />`,
            props: {
                label: 'Búsqueda',
                icon: 'search',
                iconPosition: 'right',
                placeholder: 'Buscar...'
            }
        },
        {
            name: 'Input con error',
            description: 'Campo con estado de error',
            code: `<Input label="Email" icon="envelope" error="Email requerido" />`,
            props: {
                label: 'Email',
                icon: 'envelope',
                error: 'Email requerido'
            }
        },
        {
            name: 'Input con éxito',
            description: 'Campo con estado de éxito',
            code: `<Input label="Usuario" icon="user" success="¡Disponible!" value="pedro123" />`,
            props: {
                label: 'Usuario',
                icon: 'user',
                success: '¡Disponible!',
                value: 'pedro123'
            }
        },
        {
            name: 'Input requerido',
            description: 'Campo requerido con asterisco',
            code: `<Input label="Contraseña" type="password" icon="lock" required={true} />`,
            props: {
                label: 'Contraseña',
                type: 'password',
                icon: 'lock',
                required: true
            }
        },
        {
            name: 'Input deshabilitado',
            description: 'Campo deshabilitado',
            code: `<Input label="Campo bloqueado" disabled={true} value="No editable" />`,
            props: {
                label: 'Campo bloqueado',
                disabled: true,
                value: 'No editable'
            }
        },
        {
            name: 'Diferentes tamaños',
            description: 'Comparación de tamaños',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <Input size="small" label="Pequeño" icon="user" placeholder="Input pequeño" />
  <Input size="medium" label="Mediano" icon="envelope" placeholder="Input mediano" />
  <Input size="large" label="Grande" icon="phone" placeholder="Input grande" />
</div>`,
            props: {
                size: 'medium',
                label: 'Mediano',
                icon: 'envelope',
                placeholder: 'Input mediano'
            }
        },
        {
            name: 'Diferentes tipos',
            description: 'Tipos de input disponibles',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <Input type="email" label="Email" icon="envelope" placeholder="tu@email.com" />
  <Input type="password" label="Contraseña" icon="lock" placeholder="••••••••" />
  <Input type="tel" label="Teléfono" icon="phone" placeholder="(555) 123-4567" />
  <Input type="url" label="Sitio web" icon="link" placeholder="https://ejemplo.com" />
</div>`,
            props: {
                type: 'email',
                label: 'Email',
                icon: 'envelope',
                placeholder: 'tu@email.com'
            }
        },
        {
            name: 'Formulario completo',
            description: 'Ejemplo de formulario con múltiples inputs',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px'}}>
  <Input label="Nombre completo" icon="user" placeholder="Tu nombre" required={true} />
  <Input type="email" label="Email" icon="envelope" placeholder="tu@email.com" required={true} />
  <Input type="password" label="Contraseña" icon="lock" placeholder="••••••••" required={true} />
  <Input type="tel" label="Teléfono" icon="phone" placeholder="(555) 123-4567" helperText="Opcional" />
  <Input label="Empresa" icon="building" placeholder="Nombre de la empresa" />
</div>`,
            props: {
                label: 'Nombre completo',
                icon: 'user',
                placeholder: 'Tu nombre',
                required: true
            }
        },
        {
            name: 'Estados múltiples',
            description: 'Todos los estados del input',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <Input label="Normal" icon="user" placeholder="Estado normal" />
  <Input label="Con éxito" icon="check-circle" success="¡Datos válidos!" value="correcto" />
  <Input label="Con error" icon="exclamation-circle" error="Este campo es requerido" />
  <Input label="Con ayuda" icon="info-circle" helperText="Este campo es opcional" />
  <Input label="Solo lectura" icon="eye" readOnly={true} value="Solo lectura" />
  <Input label="Deshabilitado" icon="ban" disabled={true} placeholder="Deshabilitado" />
</div>`,
            props: {
                label: 'Normal',
                icon: 'user',
                placeholder: 'Estado normal'
            }
        },
        {
            name: 'Iconos en ambos lados',
            description: 'Input con iconos izquierdo y derecho',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <Input 
    label="Búsqueda con filtro" 
    iconLeft="search" 
    iconRight="filter" 
    placeholder="Buscar y filtrar..." 
  />
  <Input 
    label="Usuario con configuración" 
    iconLeft="user" 
    iconRight="cog" 
    placeholder="Configurar usuario" 
  />
  <Input 
    label="Email con validación" 
    iconLeft="envelope" 
    iconRight="check-circle" 
    success="Email válido" 
    value="pedro@email.com" 
  />
</div>`,
            props: {
                label: 'Búsqueda con filtro',
                iconLeft: 'search',
                iconRight: 'filter',
                placeholder: 'Buscar y filtrar...'
            }
        },
        {
            name: 'Combinaciones de iconos',
            description: 'Diferentes combinaciones de iconos',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <Input iconLeft="user" placeholder="Solo icono izquierdo" />
  <Input iconRight="search" placeholder="Solo icono derecho" />
  <Input iconLeft="envelope" iconRight="check" placeholder="Ambos iconos" />
  <Input icon="phone" iconPosition="left" placeholder="Método anterior (compatible)" />
</div>`,
            props: {
                iconLeft: 'envelope',
                iconRight: 'check',
                placeholder: 'Ambos iconos'
            }
        },
        {
            name: 'Tamaños con doble icono',
            description: 'Diferentes tamaños con iconos en ambos lados',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <Input 
    size="small" 
    iconLeft="user" 
    iconRight="cog" 
    placeholder="Pequeño con ambos iconos" 
  />
  <Input 
    size="medium" 
    iconLeft="envelope" 
    iconRight="check" 
    placeholder="Mediano con ambos iconos" 
  />
  <Input 
    size="large" 
    iconLeft="search" 
    iconRight="filter" 
    placeholder="Grande con ambos iconos" 
  />
</div>`,
            props: {
                size: 'medium',
                iconLeft: 'envelope',
                iconRight: 'check',
                placeholder: 'Mediano con ambos iconos'
            }
        },
        {
            name: 'Toggle de contraseña automático',
            description: 'Input de contraseña con toggle automático',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <Input 
    type="password" 
    label="Contraseña" 
    placeholder="••••••••" 
    showPasswordToggle={true}
  />
  <Input 
    type="password" 
    label="Confirmar contraseña" 
    placeholder="••••••••" 
    showPasswordToggle={true}
    size="large"
  />
</div>`,
            props: {
                type: 'password',
                label: 'Contraseña',
                placeholder: '••••••••',
                showPasswordToggle: true
            }
        },
        {
            name: 'Iconos con callbacks personalizados',
            description: 'Iconos que ejecutan funciones al hacer click',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <Input 
    label="Búsqueda" 
    iconLeft="search" 
    iconRight="times" 
    placeholder="Buscar..."
    onIconLeftClick={() => alert('¡Buscar!')}
    onIconRightClick={() => alert('¡Limpiar!')}
  />
  <Input 
    label="Configuración" 
    iconRight="cog" 
    placeholder="Configurar..."
    onIconRightClick={() => alert('¡Abrir configuración!')}
  />
</div>`,
            props: {
                label: 'Búsqueda',
                iconLeft: 'search',
                iconRight: 'times',
                placeholder: 'Buscar...',
                onIconLeftClick: () => alert('¡Buscar!'),
                onIconRightClick: () => alert('¡Limpiar!')
            }
        },
        {
            name: 'Formulario completo con callbacks',
            description: 'Formulario con diferentes tipos de callbacks',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px'}}>
  <Input 
    label="Usuario" 
    iconLeft="user" 
    iconRight="check" 
    placeholder="Nombre de usuario"
    onIconRightClick={() => alert('¡Verificar disponibilidad!')}
  />
  <Input 
    type="email" 
    label="Email" 
    iconLeft="envelope" 
    iconRight="at" 
    placeholder="tu@email.com"
    onIconRightClick={() => alert('¡Validar email!')}
  />
  <Input 
    type="password" 
    label="Contraseña" 
    placeholder="••••••••"
    showPasswordToggle={true}
  />
  <Input 
    label="Búsqueda" 
    iconLeft="search" 
    iconRight="filter" 
    placeholder="Buscar productos..."
    onIconLeftClick={() => alert('¡Buscar!')}
    onIconRightClick={() => alert('¡Filtros!')}
  />
</div>`,
            props: {
                label: 'Usuario',
                iconLeft: 'user',
                iconRight: 'check',
                placeholder: 'Nombre de usuario',
                onIconRightClick: () => alert('¡Verificar disponibilidad!')
            }
        }
    ]
};

export default InputConfig;
