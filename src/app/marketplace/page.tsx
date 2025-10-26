'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye,
  Sparkles,
  MessageCircle,
  BarChart3,
  ShoppingCart,
  Users,
  Mail,
  Globe,
  Smartphone,
  Zap,
  Heart,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  description: string
  category: string
  price: number
  rating: number
  downloads: number
  preview: string
  author: string
  tags: string[]
  featured: boolean
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { id: 'all', name: 'Todos', icon: <Globe className="w-4 h-4" /> },
    { id: 'chatbot', name: 'Chatbots', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'dashboard', name: 'Dashboards', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'crm', name: 'CRM', icon: <Users className="w-4 h-4" /> },
    { id: 'marketing', name: 'Marketing', icon: <Mail className="w-4 h-4" /> },
    { id: 'mobile', name: 'Mobile', icon: <Smartphone className="w-4 h-4" /> }
  ]

  const templates: Template[] = [
    {
      id: '1',
      name: 'Chatbot Atendimento Pro',
      description: 'Chatbot inteligente com IA para atendimento ao cliente 24/7',
      category: 'chatbot',
      price: 29,
      rating: 4.8,
      downloads: 1247,
      preview: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop',
      author: 'TechSolutions',
      tags: ['IA', 'Atendimento', 'Automação'],
      featured: true
    },
    {
      id: '2',
      name: 'Dashboard Analytics',
      description: 'Painel completo de métricas e relatórios em tempo real',
      category: 'dashboard',
      price: 49,
      rating: 4.9,
      downloads: 892,
      preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      author: 'DataViz Studio',
      tags: ['Analytics', 'Métricas', 'Relatórios'],
      featured: true
    },
    {
      id: '3',
      name: 'Loja Online Completa',
      description: 'Template completo para e-commerce com carrinho e pagamentos',
      category: 'ecommerce',
      price: 79,
      rating: 4.7,
      downloads: 2156,
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      author: 'ShopMaster',
      tags: ['E-commerce', 'Vendas', 'Pagamentos'],
      featured: false
    },
    {
      id: '4',
      name: 'CRM Vendas Pro',
      description: 'Sistema completo de gestão de clientes e vendas',
      category: 'crm',
      price: 59,
      rating: 4.6,
      downloads: 634,
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      author: 'SalesForce+',
      tags: ['CRM', 'Vendas', 'Clientes'],
      featured: false
    },
    {
      id: '5',
      name: 'Landing Page Conversão',
      description: 'Template otimizado para alta conversão e leads',
      category: 'marketing',
      price: 19,
      rating: 4.5,
      downloads: 3421,
      preview: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
      author: 'ConvertMax',
      tags: ['Landing Page', 'Conversão', 'Marketing'],
      featured: false
    },
    {
      id: '6',
      name: 'App Mobile Nativo',
      description: 'Template para aplicativo mobile responsivo',
      category: 'mobile',
      price: 39,
      rating: 4.4,
      downloads: 756,
      preview: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      author: 'MobileDev',
      tags: ['Mobile', 'Responsivo', 'App'],
      featured: false
    },
    {
      id: '7',
      name: 'Chatbot E-commerce',
      description: 'Bot especializado em vendas e suporte para lojas online',
      category: 'chatbot',
      price: 35,
      rating: 4.7,
      downloads: 987,
      preview: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
      author: 'BotCommerce',
      tags: ['Chatbot', 'E-commerce', 'Vendas'],
      featured: false
    },
    {
      id: '8',
      name: 'Dashboard Financeiro',
      description: 'Controle financeiro completo com gráficos e relatórios',
      category: 'dashboard',
      price: 45,
      rating: 4.8,
      downloads: 1123,
      preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      author: 'FinanceTrack',
      tags: ['Financeiro', 'Dashboard', 'Controle'],
      featured: true
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return parseInt(b.id) - parseInt(a.id)
      default:
        return 0
    }
  })

  const featuredTemplates = templates.filter(t => t.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                kportugal.ai
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/editor" className="text-gray-300 hover:text-white transition-colors">Editor</Link>
              <Link href="/marketplace" className="text-white font-medium">Marketplace</Link>
              <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                Vender Template
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Marketplace de Templates
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubra templates profissionais criados pela comunidade. 
            Acelere seu desenvolvimento com soluções prontas para usar.
          </p>
        </div>

        {/* Featured Templates */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Star className="w-6 h-6 text-yellow-400 mr-2" />
              Templates em Destaque
            </h2>
            <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/10">
              Ver Todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.slice(0, 3).map((template) => (
              <Card key={template.id} className="bg-gray-900/50 border-gray-800 hover:border-purple-600/50 transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                  <div className="absolute top-3 right-3 bg-black/70 rounded-full p-2">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        por {template.author}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">€{template.price}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {template.rating}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {template.downloads}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-600/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Pesquisar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Categoria
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'default' : 'ghost'}
                        className={`w-full justify-start ${
                          selectedCategory === category.id 
                            ? 'bg-purple-600 text-white' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                  >
                    <option value="popular">Mais Popular</option>
                    <option value="rating">Melhor Avaliado</option>
                    <option value="price-low">Menor Preço</option>
                    <option value="price-high">Maior Preço</option>
                    <option value="newest">Mais Recente</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {filteredTemplates.length} templates encontrados
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-300">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="bg-gray-900/50 border-gray-800 hover:border-purple-600/50 transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {template.featured && (
                      <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                        <Star className="w-3 h-3 mr-1" />
                        Destaque
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 bg-black/70 rounded-full p-2">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">
                          por {template.author}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">€{template.price}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {template.rating}
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {template.downloads}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Comprar
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-600/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Nenhum template encontrado</h3>
                <p className="text-gray-400 mb-4">
                  Tente ajustar seus filtros ou termos de pesquisa
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}