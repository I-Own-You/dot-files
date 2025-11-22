<script setup lang="ts">
import { ref } from "vue";
import BlogPost from "./BlogPost.vue";
import ButtonCounter from "./09_fallthrough_attributes/ButtonCounter.vue";
import FancyButton from "./09_slots/FancyButton.vue";
import ComponentVModel from "./09_component-v-model/ComponentVModel.vue";

const posts = ref([
    { id: 1, title: "My journey with Vue" },
    { id: 2, title: "Blogging with Vue" },
    { id: 3, title: "Why Vue is so fun" },
]);
const postFontSize = ref(1);
const tabs = ref([1, 2, 3]);
const currentTab = ref(1);
const post = {
    id: 1,
    title: "My Journey with Vue",
};
const handleMyNumber = (n: number): void => console.log(n);
const countModel = ref(0);
const onClick = () => {};
const dynamicSlotName1 = ref("");
const dynamicSlotName2 = ref("");
</script>

<template>
    <h1>Here is a child component!</h1>
    <!-- we automatically have our prop from child component defined with defineProps -->
    <!-- you must also use kebab-case when assigning a prop, since html is case insensitive -->
    <BlogPost title="someStaticTitle" />
    <div :style="{ fontSize: postFontSize + 'em' }">
        <!-- this way, enlarge-text will be the name of the event that BlogPost will trigger,
             its a way for a parent component to listen to child events -->
        <BlogPost
            v-for="post in posts"
            :key="post.id"
            :title="post.title"
            @enlarge-text="postFontSize += 0.1"
        />

        <!-- when you need to handle arguments of emmitted event, you can use inline func with argument inside () -->
        <BlogPost @example-func="(myNumber:number) => console.log(myNumber)" />
        <!-- or you could just pass the function that handles it -->
        <BlogPost @example-func="handleMyNumber" />
        <!-- with v-bind, we can assign an object and it will destructure into inline props
             in our case it will look like <BlogPost :id="post.id" :title="post.title" />  -->
        <BlogPost v-bind="post" />
    </div>

    <!-- you can create a 2 way binding with parent/child to update each other,
         countModel here is just passed as a prop
         note: using no argument after v-model means child will use the default one, so countModel -->
    <ComponentVModel v-model="countModel" />
    <!-- you can give an argument after v-model so vue could choose which v-model to bind in child -->
    <ComponentVModel v-model:title="countModel" />

    <!-- if you specify an event on a component, it automatically goes intits root tag
         and if taht root tag already had a click event, both will fire -->
    <!-- note: fallthrough are attributes that are not declared as props/events with defineProps/defineEmits
               inside component, so: class, style, v-on(events), id -->
    <ButtonCounter @click="onClick" />

    <!-- by placing text inside a component, it will go into <slot /> in component where its defined -->
    <FancyButton>My Text that will go to SlotExample</FancyButton>
    <!-- we can place any template, not just text -->
    <FancyButton>
        <span style="color: red">Click me!</span>
        <AwesomeIcon name="plus" />
    </FancyButton>
    <!-- we can use parents data also -->
    <FancyButton>{{ currentTab }}</FancyButton>
    <!-- if you pass no data but FancyButton do have <slot>, you can specifiy fallback inside  it -->
    <FancyButton />
    <!-- you can also specify where slots will go with #slotName or v-slit:slotName -->
    <FancyButton>
        <template #header>
            <h1>Here might be a page title</h1>
        </template>
        <!-- you could erase #default since template without name has implicitly "default" name -->
        <template #default>
            <p>A paragraph for the main content.</p>
            <p>And another one.</p>
        </template>
        <template #footer>
            <p>Here's some contact info</p>
        </template>
    </FancyButton>
    <!-- we can also have dynamic name for slots -->
    <FancyButton>
        <template v-slot:[dynamicSlotName1]> </template>
        <template #[dynamicSlotName2]> </template>
    </FancyButton>
    <!--  -->
    <!-- we can also pass data(props) from child slot to parent -->
    <FancyButton v-slot="slotProps">
        {{ slotProps.text }}, {{ slotProps.myNumber }}
    </FancyButton>
    <!-- or we could destructure it -->
    <FancyButton v-slot="{ myNumber, text }">
        {{ myNumber }}, {{ text }}
    </FancyButton>
    <!-- passing data to parent from a named slot -->
    <FancyButton>
        <template #headerProps="headerPropsObj">
            {{ headerPropsObj.text }}
        </template>
        <!-- when mixing default/named scoped slots, we need to include default slot inside template -->
        <template #default="defaultPropsObj">
            {{ (defaultPropsObj.myNumber, defaultPropsObj.text) }}
        </template>
        <template #footerProps="footerPropsObj">
            {{ footerPropsObj.isB }}
        </template>
    </FancyButton>
    <!-- why its usefull to pass data from child to parent in slot ? so data/logic stays there, and you style here -->
    <FancyButton>
        <template #item="{ body, username, likes }">
            <div class="item">
                <p>{{ body }}</p>
                <p>by {{ username }} | {{ likes }} likes</p>
            </div>
        </template>
    </FancyButton>

    <!-- <component></component> gives the ability to switch between real components where "is" attribute is either:
        1. name stringof a registered component or actual imported component 
        2. is can be used to create simple html elements as well
        note: 
            keep in mind that components will unmount everytime you switch between them, if you need them to be alive,
            you must use builtin <KeepAlive> vue component -->
    <component :is="tabs[currentTab]"></component>
    <!-- note: when you pass props / use events, use kebab-case, not camelCase because of HTML inlining -->
    <!-- note: only parent can mutate props and it automatically goes into child components,
                   but child components cannot mutate it, vue will trigger an warning -->
</template>
