import TextArea from './TextArea.jsx';

export const TextAreaConfig = {
    component: TextArea,
    name: 'TextArea',
    category: 'atoms',
    description: 'Componente de área de texto multilínea con soporte para auto-grow, iconos, estados, callbacks y contador de caracteres.',

    variants: [
        {
            name: 'TextArea básico',
            description: 'Área de texto básica',
            code: `<TextArea placeholder="Escribe aquí..." rows={3} />`,
            props: {
                placeholder: 'Escribe aquí...',
                rows: 3
            }
        },
        {
            name: 'TextArea con label',
            description: 'Área de texto con etiqueta',
            code: `<TextArea label="Comentarios" placeholder="Escribe tu mensaje..." rows={4} />`,
            props: {
                label: 'Comentarios',
                placeholder: 'Escribe tu mensaje...',
                rows: 4
            }
        },
        {
            name: 'TextArea con iconos',
            description: 'Área de texto con iconos clicables',
            code: `<TextArea 
  label="Mensaje" 
  iconLeft="comment" 
  iconRight="send" 
  placeholder="Escribe un comentario..."
  onIconRightClick={() => alert('¡Enviar mensaje!')}
/>`,
            props: {
                label: 'Mensaje',
                iconLeft: 'comment',
                iconRight: 'send',
                placeholder: 'Escribe un comentario...',
                onIconRightClick: () => alert('¡Enviar mensaje!')
            }
        },
        {
            name: 'TextArea con auto-grow',
            description: 'Área de texto que crece automáticamente',
            code: `<TextArea 
  label="Descripción" 
  autoGrow={true} 
  minRows={3} 
  maxRows={8} 
  placeholder="Escribe una descripción detallada..."
/>`,
            props: {
                label: 'Descripción',
                autoGrow: true,
                minRows: 3,
                maxRows: 8,
                placeholder: 'Escribe una descripción detallada...'
            }
        },
        {
            name: 'TextArea con contador',
            description: 'Área de texto con contador de caracteres',
            code: `<TextArea 
  label="Comentario" 
  maxLength={200} 
  placeholder="Máximo 200 caracteres..."
  helperText="Describe tu experiencia"
/>`,
            props: {
                label: 'Comentario',
                maxLength: 200,
                placeholder: 'Máximo 200 caracteres...',
                helperText: 'Describe tu experiencia'
            }
        },
        {
            name: 'TextArea con estados',
            description: 'Diferentes estados del TextArea',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <TextArea 
    label="Con error" 
    error="Este campo es requerido" 
    placeholder="Campo con error"
  />
  <TextArea 
    label="Con éxito" 
    success="¡Mensaje guardado!" 
    value="Contenido válido"
  />
  <TextArea 
    label="Deshabilitado" 
    disabled={true} 
    placeholder="No editable"
  />
</div>`,
            props: {
                label: 'Con error',
                error: 'Este campo es requerido',
                placeholder: 'Campo con error'
            }
        },
        {
            name: 'Diferentes tamaños',
            description: 'TextArea en diferentes tamaños',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <TextArea 
    size="small" 
    label="Pequeño" 
    placeholder="TextArea pequeño"
    rows={2}
  />
  <TextArea 
    size="medium" 
    label="Mediano" 
    placeholder="TextArea mediano"
    rows={3}
  />
  <TextArea 
    size="large" 
    label="Grande" 
    placeholder="TextArea grande"
    rows={4}
  />
</div>`,
            props: {
                size: 'medium',
                label: 'Mediano',
                placeholder: 'TextArea mediano',
                rows: 3
            }
        },
        {
            name: 'Opciones de resize',
            description: 'Diferentes opciones de redimensionamiento',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <TextArea 
    label="Sin resize" 
    resize="none" 
    placeholder="No se puede redimensionar"
  />
  <TextArea 
    label="Resize vertical" 
    resize="vertical" 
    placeholder="Solo vertical"
  />
  <TextArea 
    label="Resize horizontal" 
    resize="horizontal" 
    placeholder="Solo horizontal"
  />
  <TextArea 
    label="Resize ambos" 
    resize="both" 
    placeholder="Ambas direcciones"
  />
</div>`,
            props: {
                label: 'Resize vertical',
                resize: 'vertical',
                placeholder: 'Solo vertical'
            }
        },
        {
            name: 'TextArea completo',
            description: 'TextArea con todas las características',
            code: `<TextArea 
  label="Reseña del producto" 
  placeholder="Escribe tu reseña..."
  iconLeft="star" 
  iconRight="check"
  autoGrow={true}
  minRows={4}
  maxRows={10}
  maxLength={500}
  required={true}
  helperText="Comparte tu experiencia con otros usuarios"
  onIconRightClick={() => alert('¡Validar reseña!')}
/>`,
            props: {
                label: 'Reseña del producto',
                placeholder: 'Escribe tu reseña...',
                iconLeft: 'star',
                iconRight: 'check',
                autoGrow: true,
                minRows: 4,
                maxRows: 10,
                maxLength: 500,
                required: true,
                helperText: 'Comparte tu experiencia con otros usuarios',
                onIconRightClick: () => alert('¡Validar reseña!')
            }
        },
        {
            name: 'Formulario de contacto',
            description: 'Ejemplo de formulario con TextArea',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px'}}>
  <TextArea 
    label="Asunto" 
    placeholder="Describe brevemente el tema..."
    rows={2}
    maxLength={100}
  />
  <TextArea 
    label="Mensaje" 
    placeholder="Escribe tu mensaje detallado..."
    iconLeft="envelope"
    iconRight="send"
    autoGrow={true}
    minRows={5}
    maxRows={12}
    maxLength={1000}
    required={true}
    onIconRightClick={() => alert('¡Enviar mensaje!')}
  />
  <TextArea 
    label="Comentarios adicionales" 
    placeholder="Información extra (opcional)..."
    resize="none"
    rows={3}
    helperText="Este campo es opcional"
  />
</div>`,
            props: {
                label: 'Mensaje',
                placeholder: 'Escribe tu mensaje detallado...',
                iconLeft: 'envelope',
                iconRight: 'send',
                autoGrow: true,
                minRows: 5,
                maxRows: 12,
                maxLength: 1000,
                required: true,
                onIconRightClick: () => alert('¡Enviar mensaje!')
            }
        },
        {
            name: 'TextArea con callbacks',
            description: 'TextArea con iconos interactivos',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
  <TextArea 
    label="Editor de texto" 
    iconLeft="edit" 
    iconRight="save"
    placeholder="Escribe tu contenido..."
    onIconLeftClick={() => alert('¡Modo edición!')}
    onIconRightClick={() => alert('¡Guardar contenido!')}
  />
  <TextArea 
    label="Chat mensaje" 
    iconLeft="comment" 
    iconRight="paper-plane"
    placeholder="Escribe tu mensaje..."
    autoGrow={true}
    maxRows={6}
    onIconRightClick={() => alert('¡Enviar chat!')}
  />
</div>`,
            props: {
                label: 'Editor de texto',
                iconLeft: 'edit',
                iconRight: 'save',
                placeholder: 'Escribe tu contenido...',
                onIconLeftClick: () => alert('¡Modo edición!'),
                onIconRightClick: () => alert('¡Guardar contenido!')
            }
        }
    ]
};

export default TextAreaConfig;
