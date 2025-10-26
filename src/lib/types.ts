export interface User {
  id: string
  email: string
  name: string
  credits: number
  plan: 'free' | 'pro' | 'business'
  created_at: string
}

export interface App {
  id: string
  user_id: string
  name: string
  description: string
  config: AppConfig
  published: boolean
  subdomain: string
  created_at: string
}

export interface AppConfig {
  components: Component[]
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
  }
}

export interface Component {
  id: string
  type: 'text' | 'button' | 'form' | 'image' | 'chatbot' | 'dashboard'
  position: { x: number; y: number }
  size: { width: number; height: number }
  props: Record<string, any>
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  config: AppConfig
  price: number
  author_id: string
  created_at: string
}

export interface Plan {
  id: string
  name: string
  price: number
  credits: number
  features: string[]
}