<template>
  <h3 class="ion-margin-start">Create Recipe</h3>
  <ion-grid>
    <ion-row>
      <ion-col>
        <!-- RecipeForm -->
        <RecipeForm @new-recipe="addRecipe" :editingRecipe="editingRecipe" />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col v-for="recipe in recipes" :key="recipe.name">
        <RecipeCard :recipe="recipe" /><button @click="editRecipe(recipe)">
          Edit
        </button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { client } from "../api/db";
import RecipeForm from "./RecipeForm.vue";
import RecipeCard from "./RecipeCard.vue";
import type { Recipe } from "../util/Types";

export default defineComponent({
  components: {
    RecipeForm,
    RecipeCard,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const recipes = reactive<Recipe[]>([]);
    const editingRecipe = reactive<Recipe>({
      id: undefined,
      name: "",
      body: "",
      ingredients: [],
    });
    const addRecipe = (recipe: Recipe) => {
      postRecipe(recipe).then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const newRecipe = data[0] as Recipe;
          const index = recipes.findIndex(
            (existingRecipe) => existingRecipe.id === data[0].id
          );

          index !== -1 && recipes.splice(index, 1);
          recipes.push(newRecipe);
        } else {
          console.error(error);
        }
      });
    };
    const removeRecipe = (recipe: Recipe) => {
      recipes.splice(
        recipes.findIndex((existing) => existing.name === recipe.name),
        1
      );
    };
    const postRecipe = (recipe: Recipe) =>
      recipe.id
        ? client.from("recipes").update(recipe).match({ id: recipe.id })
        : client.from("recipes").insert(recipe);

    const editRecipe = (recipe: Recipe) => {
      editingRecipe.id = recipe.id;
      editingRecipe.name = recipe.name;
      editingRecipe.body = recipe.body;
      editingRecipe.ingredients = recipe.ingredients;
      removeRecipe(recipe);
    };

    // Fetch existing recipes from DB
    onMounted(async () => {
      const { data, error } = await client.from("recipes").select("*");
      if (!error && data) {
        data.forEach((recipe) => recipes.push(recipe));
      } else {
        console.error(error);
      }
    });
    return { recipes, addRecipe, postRecipe, editRecipe, editingRecipe };
  },
});
</script>
