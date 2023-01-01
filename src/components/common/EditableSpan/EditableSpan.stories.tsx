import {EditableSpan} from "./EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args = {
    value: 'initial value',
    fontSize: '16px',
    variant: "body1",
    callback: action('change value')
}