<template>
  <ion-item>
    <ion-label position="floating">Name</ion-label>
    <ion-input
      accept="text"
      required
      v-model="recipe.name"
      placeholder="e.g. French Fries"
      @ionBlur="toLocalStorage"
    ></ion-input>
  </ion-item>
  <ion-item @ionBlur="pushCurrentIngredient">
    <div style="display: flex; flex-direction: space-between">
      <div>
        <ion-label position="floating">Ingredients</ion-label>
        <ion-input
          placeholder="e.g. Potatoes"
          v-model="currentIngredient.name"
        />
      </div>
      <div>
        <ion-label position="floating">Amount</ion-label>
        <ion-input placeholder="e.g. 500g" v-model="currentIngredient.amount" />
      </div>
    </div>
  </ion-item>
  <ion-item>
    <div v-if="recipe.ingredients.length">
      <ion-chip v-for="[name, amount] in recipe.ingredients" :key="name">
        <ion-label color="secondary">{{ amount }} {{ name }} </ion-label>
        <ion-icon :icon="close" @click="removeIngredient(name)"></ion-icon>
      </ion-chip>
    </div>
    <div v-else><p>List of ingredients if they existed!</p></div>
  </ion-item>
  <ion-item>
    <ion-label position="floating">Preparation</ion-label>
    <ion-textarea
      placeholder="How to prepare the meal?"
      v-model="recipe.body"
      @ionBlur="toLocalStorage"
    ></ion-textarea
  ></ion-item>
  <ion-button
    @click="$emit('new-recipe', recipe), resetRecipe()"
    :disabled="!recipe.name || !recipe.body || !recipe.ingredients.length"
    >Add Recipe</ion-button
  >
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import {
  IonLabel,
  IonInput,
  IonItem,
  IonTextarea,
  IonButton,
  IonChip,
  IonIcon,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { RecipeStorageItemName } from "@/util/constants";
import type { Recipe } from "../util/Types";

export default defineComponent({
  components: {
    IonLabel,
    IonInput,
    IonItem,
    IonTextarea,
    IonButton,
    IonChip,
    IonIcon,
  },
  props: {
    editingRecipe: {
      type: Object,
      required: true,
    },
  },
  emits: ["new-recipe"],
  setup(props) {
    const currentIngredient = ref({ name: "", amount: "" });
    const recipe = reactive<Recipe>({
      id: undefined,
      name: "",
      body: "",
      ingredients: [],
    });

    watch(props.editingRecipe as Recipe, (editingRecipe, unsavedRecipe) => {
      if (
        props.editingRecipe.name ||
        props.editingRecipe.body ||
        props.editingRecipe.ingredients.length > 0
      ) {
        recipe.id = editingRecipe.id;
        recipe.name = editingRecipe.name;
        recipe.body = editingRecipe.body;
        recipe.ingredients = [...editingRecipe.ingredients];
        toLocalStorage("UnsavedRecipe", unsavedRecipe);
        toLocalStorage(RecipeStorageItemName);
      }
    });

    const toLocalStorage = (itemName: string, data = recipe) => {
      localStorage.setItem(itemName, JSON.stringify(data));
    };

    const pushCurrentIngredient = () => {
      if (currentIngredient.value.name && currentIngredient.value.amount) {
        const newIngredient = [
          currentIngredient.value.name,
          currentIngredient.value.amount,
        ] as [string, string];
        recipe.ingredients.push(newIngredient);
        currentIngredient.value = { name: "", amount: "" };
        toLocalStorage(RecipeStorageItemName);
      }
    };

    const removeIngredient = (nameToRemove: string) => {
      const updatedIngredients = recipe.ingredients.filter(
        ([name]) => name !== nameToRemove
      );
      recipe.ingredients = updatedIngredients;
      toLocalStorage(RecipeStorageItemName);
    };

    const resetRecipe = () => {
      recipe.name = "";
      recipe.body = "";
      recipe.ingredients = [];
      toLocalStorage(RecipeStorageItemName);
    };

    return {
      recipe,
      currentIngredient,
      close,
      toLocalStorage,
      pushCurrentIngredient,
      removeIngredient,
      resetRecipe,
    };
  },
});
</script>
