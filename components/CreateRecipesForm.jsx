'use client'

import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

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
});

const CreateRecipesForm = () => {

  const router = useRouter()
  const { data: session } = useSession()

  const [ingredients, setIngredients] = useState(['']);
  const [cookingSteps, setCookingSteps] = useState(['']);

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
    }
  })

  // Ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']); // Add new ingredient field
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
    newCookingSteps.pop(); // Removes the last cooking step
    setCookingSteps(newCookingSteps);
  };

  const onSubmit = async (values) => {
      
      const ingredientsArray = ingredients.filter(ingredient => ingredient.trim() !== '');
      const cookingStepsArray = cookingSteps.filter(step => step.trim() !== '');
      const tagsArray = values.tags?.split(',').map((tag) => tag.trim());
  
      const formData = { ...values, ingredients: ingredientsArray, tags: tagsArray, cookingSteps: cookingStepsArray };

      if(ingredientsArray[0] === undefined){        
        toast({
          variant: "destructive",
          description: "Insira ao menos um ingrediente!",
        })
        return
      }

      if(cookingStepsArray[0] === undefined){        
        toast({
          variant: "destructive",
          description: 'O modo de preparo é obrigatório',
        })
        return
      }
      console.log(formData);
      createRecipe(formData)
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

      if(res.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  }

  const onCancel = () => {
    // todo
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto md:w-3/4 lg:w-2/3">
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

        <div className="flex flex-col md:flex-row md:gap-x-4">
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <FormLabel className="mb-1 text-gray-700 font-medium">Ingredientes:</FormLabel>
              <Button type="button" variant="ghost" onClick={handleAddIngredient} className="mt-2 text-primary text-xs">Adicionar Ingrediente</Button>
            </div>
            {ingredients.map((ingredient, index) => (
              <FormItem key={index} className="flex flex-col">
                
                <FormControl>
                  <Input
                    placeholder="Digite um ingrediente..."
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </FormControl>
                
                {(index === ingredients.length - 1) && (index !== 0) && (
                  <div className="flex items-center mt-2">
                    <Button type="button" variant="ghost" onClick={handleRemoveIngredient} className="text-red-600 text-xs">Remover</Button>
                  </div>
                )}
              </FormItem>
            ))}
            
          </div>

          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <FormLabel className="mb-1 text-gray-700 font-medium">Modo de Preparo:</FormLabel>
              <Button type="button" variant="ghost" onClick={handleAddCookingStep} className="mt-2 text-primary text-xs">Adicionar Etapa</Button>

            </div>
            {cookingSteps.map((step, index) => (
              <FormItem key={index} className="flex flex-col">
                <FormControl>
                  <Input
                    placeholder="Digite um passo de preparo..."
                    value={step}
                    onChange={(e) => handleCookingStepChange(index, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </FormControl>
                {(index === cookingSteps.length - 1) && (index !== 0) && (
                  <div className="flex items-center mt-2">
                    <Button type="button" variant="ghost" onClick={handleRemoveCookingStep} className="text-red-600 text-xs">Remover</Button>
                  </div>
                )}
              </FormItem>
            ))}
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
                  <Input type='number' placeholder="Digite o tempo em minutos" {...field} className="p-2 border border-gray-300 rounded-md" />
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
          <Button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Salvar Receita</Button>
          <Button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400">Cancelar</Button>
        </div>
      </form>
    </Form>
  );

}

export default CreateRecipesForm