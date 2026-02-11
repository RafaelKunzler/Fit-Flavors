'use client'

import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Select, SelectContent, SelectItem, SelectValue } from "./ui/select"
import { SelectTrigger } from "@radix-ui/react-select"

const formSchema = z.object({
  recipeName: z.string().min(1, 'O nome da receita é obrigatório'),
  description: z.string().optional(),
  ingredients: z.array(z.string()).min(1, 'Pelo menos um ingrediente é obrigatório'),
  cookingSteps: z.array(z.string()).min(1, 'O modo de preparo é obrigatório'),
  preparationTime: z.coerce.number().min(1, 'O tempo de preparo é obrigatório'),
  servings: z.coerce.number().min(1, 'O número de porções deve ser pelo menos 1'),
  caloriesPerServing: z.coerce.number().optional(),
  tags: z.string().optional(),
  image: z.string().url().optional(),
  authorNotes: z.string().optional(),
  difficulty: z.string(),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
});

const CreateRecipesForm = ({ recipe, recipeId, type }) => {

  const router = useRouter()
  const { data: session } = useSession()

  const [ingredients, setIngredients] = useState(['']);
  const [cookingSteps, setCookingSteps] = useState(['']);
  const [difficulty, setDifficulty] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipeName: '',
      description: '',
      ingredients: [''],
      cookingSteps: [''],
      preparationTime: '',
      servings: '',
      caloriesPerServing: '',
      tags: '',
      image: '',
      authorNotes: '',
      difficulty: '',
      vegan: false,
      vegetarian: false,
    },
    values: recipe ? recipe.recipe : undefined,
  })

  // fetch ingredients and steps for edit
  useEffect(() => {
    if (recipe && recipe.recipe) {
      setIngredients(recipe.recipe.ingredients);
      setCookingSteps(recipe.recipe.cookingSteps)
    }
  }, [recipe])

  // Ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index) => {
    if (ingredients.length === 1) return; // Prevents removal if there is only one ingredient
    const newIngredients = [...ingredients];
    newIngredients.pop();
    setIngredients(newIngredients);
  };

  // Cooking Steps
  const handleAddCookingStep = () => {
    setCookingSteps([...cookingSteps, '']);
  };

  const handleCookingStepChange = (index, value) => {
    const newCookingSteps = [...cookingSteps];
    newCookingSteps[index] = value;
    setCookingSteps(newCookingSteps);
  };

  const handleRemoveCookingStep = () => {
    if (cookingSteps.length === 1) return; // Prevents removal if there is only one cooking step
    const newCookingSteps = [...cookingSteps];
    newCookingSteps.pop();
    setCookingSteps(newCookingSteps);
  };

  const onSubmit = async (values) => {

    const ingredientsArray = ingredients.filter(ingredient => ingredient.trim() !== '');
    const cookingStepsArray = cookingSteps.filter(step => step.trim() !== '');
    const tagsArray = values.tags?.split(',').map((tag) => tag.trim());

    const formData = { ...values, ingredients: ingredientsArray, tags: tagsArray, cookingSteps: cookingStepsArray };

    if (ingredientsArray[0] === undefined) {
      toast({
        variant: "destructive",
        description: "Insira ao menos um ingrediente!",
      })
      return
    }

    if (cookingStepsArray[0] === undefined) {
      toast({
        variant: "destructive",
        description: 'O modo de preparo é obrigatório',
      })
      return
    }

    if (type === "Criar") createRecipe(formData)
    if (type === "Editar") updateRecipe(formData)
  };

  const createRecipe = async (data) => {
    setSubmitting(true)

    try {
      const res = await fetch('api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          recipe: data,
          userId: session?.user.id
        })
      })

      if (res.ok) {
        router.push('/recipes-feed')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  }

  const updateRecipe = async (data) => {
    setSubmitting(true)

    if (!recipeId) return alert('Id de receita não encontrado!')

    try {
      const res = await fetch(`api/recipe/${recipeId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          recipe: data,
        })
      })

      if (res.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.log(error);
    } finally {

    }
  }

  const onCancel = () => {
    // todo
  };

  return (


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md md:mx-auto w-screen lg:w-2/3">
        <FormField
          control={form.control}
          name="recipeName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1 text-gray-700 font-medium">Nome da Receita:</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da receita..." {...field} className="p-2 border border-gray-300 rounded-md" />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1 text-gray-700 font-medium">Descrição:</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite a descrição..." {...field} className="p-2 border border-gray-300 rounded-md bg-gray-100" />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-3 flex-wrap">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1 text-gray-700 font-medium">Dificuldade:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="md:w-[240px] text-sm text-left text-gray-500 p-2 border border-gray-300 rounded-md bg-gray-100">
                      <SelectValue placeholder='Escolha uma dificuldade' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facil">Fácil</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="dificil">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-between py-2 gap-4">
            <FormField
              control={form.control}
              name="vegan"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <FormLabel>
                      Receita Vegana
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="vegan"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                  </div>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vegetarian"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <FormLabel>
                      Receita Vegetariana
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="vegan"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                  </div>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
          </div>

        </div>

        <div className="flex flex-col md:flex-row md:gap-x-4">
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <FormLabel className="mb-1 text-gray-700 font-medium">Ingredientes:</FormLabel>
            </div>
            {ingredients && ingredients.map((ingredient, index) => (
              <FormItem key={index} className="flex flex-col">

                <FormControl>
                  <Input
                    placeholder="Digite um ingrediente..."
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md mb-1"
                  />

                </FormControl>

                {(index === ingredients.length - 1) && (index !== 0) && (
                  <div className="flex items-center mt-2">

                    <Button type="button" variant="ghost" onClick={handleRemoveIngredient} className="text-red-600 text-xs">Remover</Button>
                  </div>
                )}
              </FormItem>
            ))}
            <Button type="button" variant="ghost" onClick={handleAddIngredient} className="text-primary text-xs">Adicionar Ingrediente</Button>


          </div>

          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <FormLabel className="mb-1 text-gray-700 font-medium">Modo de Preparo:</FormLabel>

            </div>
            {cookingSteps.map((step, index) => (
              <FormItem key={index} className="flex flex-col">
                <FormControl>
                  <Input
                    placeholder="Digite um passo de preparo..."
                    value={step}
                    onChange={(e) => handleCookingStepChange(index, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md mb-1"
                  />
                </FormControl>
                {(index === cookingSteps.length - 1) && (index !== 0) && (
                  <div className="flex items-center mt-2">
                    <Button type="button" variant="ghost" onClick={handleRemoveCookingStep} className="text-red-600 text-xs">Remover</Button>
                  </div>
                )}
              </FormItem>
            ))}
            <Button type="button" variant="ghost" onClick={handleAddCookingStep} className="text-primary text-xs">Adicionar Etapa</Button>

          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-x-4">
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1 text-gray-700 font-medium">Tempo de Preparo:</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="Digite em minutos o tempo" {...field} className="p-2 border border-gray-300 rounded-md" />
                </FormControl>
                <FormMessage className="text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1 text-gray-700 font-medium">Porções:</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="Digite o número de porções..." {...field} className="p-2 border border-gray-300 rounded-md" />
                </FormControl>
                <FormMessage className="text-red-500 mt-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caloriesPerServing"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1 text-gray-700 font-medium">Calorias por Porção:</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="Digite as calorias por porção..." {...field} className="p-2 border border-gray-300 rounded-md" />
                </FormControl>
                <FormMessage className="text-red-500 mt-1" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1 text-gray-700 font-medium">Tags:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite as tags, separando-as por vírgula ou quebra de linha..."
                  {...field}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1 text-gray-700 font-medium">URL da Imagem:</FormLabel>
              <FormControl>
                <Input placeholder="Insira o URL da imagem..." {...field} className="p-2 border border-gray-300 rounded-md" />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorNotes"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1 text-gray-700 font-medium">Notas do Autor:</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite as notas do autor..." {...field} className="p-2 border border-gray-300 rounded-md" />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">{type} Receita</Button>
          <Button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-red-500 hover:text-white">Cancelar</Button>
        </div>
      </form>
    </Form>

  );

}


export default CreateRecipesForm