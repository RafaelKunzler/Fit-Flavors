"use client"

import { z } from "zod"

const formSchema = z.object({
  recipe: z.string().min(2).max(50),
})
