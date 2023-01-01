import {AddItemForm} from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default  {
    title: 'Todolist/AddItemForm',
    component: AddItemForm
} as ComponentMeta<typeof AddItemForm>

const Tempalate: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Tempalate.bind({})

AddItemFormStory.args = {
    onClick: action('add new item')
}