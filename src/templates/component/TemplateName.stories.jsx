import TemplateName from './TemplateName';

export default {
    title: 'Atoms/TemplateName',
    component: TemplateName,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS classes adicionales'
        },
        children: {
            control: 'text',
            description: 'Contenido del componente'
        }
    }
};

const Template = (args) => <TemplateName {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Default TemplateName'
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
    className: 'custom-class',
    children: 'TemplateName with custom class'
};

export const Empty = Template.bind({});
Empty.args = {};
