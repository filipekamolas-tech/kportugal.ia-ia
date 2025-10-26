'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Globe, 
  Edit, 
  Trash2,
  Sparkles,
  BarChart3,
  Users,
  Zap,
  Crown,
  Settings
} from 'lucide-react'
import Link from 'next/link'

interface UserApp {
  id: string
  name: string
  description: string
  published: boolean
  subdomain: string
  views: number
  created_at: string
  status: 'draft' | 'published' | 'archived'
}

export default function DashboardPage() {
  const [user] = useState({
    name: 'João Silva',
    email: 'joao@exemplo.com',
    credits: 250,
    plan: 'free' as const,
    totalApps: 3,
    totalViews: 1247
  })

  const [apps, setApps] = useState<UserApp[]>([
    {
      id: '1',
      name: 'Chatbot Atendimento',
      description: 'Bot inteligente para atendimento ao cliente',
      published: true,
      subdomain: 'chatbot-joao',
      views: 847,
      created_at: '2024-01-15',
      status: 'published'
    },
    {
      id: '2', 
      name: 'CRM Vendas',
      description: 'Sistema de gestão de vendas e clientes',
      published: false,
      subdomain: 'crm-vendas',
      views: 0,
      created_at: '2024-01-20',
      status: 'draft'
    },
    {
      id: '3',
      name: 'Dashboard Analytics',
      description: 'Painel de métricas e relatórios',
      published: true,
      subdomain: 'analytics-dash',
      views: 400,
      created_at: '2024-01-25',
      status: 'published'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800'
      case 'pro': return 'bg-purple-100 text-purple-800'
      case 'business': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'pro': return <Zap className="w-4 h-4" />
      case 'business': return <Crown className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                kportugal.ai
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-white font-medium">Dashboard</Link>
              <Link href="/editor" className="text-gray-300 hover:text-white transition-colors">Editor</Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors">Marketplace</Link>
              <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge className={`${getPlanColor(user.plan)} flex items-center space-x-1`}>
                {getPlanIcon(user.plan)}
                <span className="capitalize">{user.plan}</span>
              </Badge>
              <Button variant="ghost" size="sm" className="text-gray-300">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bem-vindo, {user.name}! 👋
          </h1>
          <p className="text-gray-400">
            Gerencie suas aplicações e explore novas possibilidades
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Créditos</p>
                  <p className="text-2xl font-bold text-white">250</p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Apps Criadas</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total de Views</p>
                  <p className="text-2xl font-bold text-white">1.247</p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Plano Atual</p>
                  <p className="text-2xl font-bold text-white capitalize">free</p>
                </div>
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/editor">
            <Button className="w-full h-16 bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Nova App</span>
            </Button>
          </Link>
          
          <Link href="/marketplace">
            <Button variant="outline" className="w-full h-16 border-purple-600 text-purple-300 hover:bg-purple-600/10 flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Marketplace</span>
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full h-16 border-gray-600 text-gray-300 hover:bg-gray-600/10 flex items-center justify-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </Button>
          
          <Button variant="outline" className="w-full h-16 border-gray-600 text-gray-300 hover:bg-gray-600/10 flex items-center justify-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Comunidade</span>
          </Button>
        </div>

        {/* Apps Section */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Minhas Aplicações</CardTitle>
                <CardDescription className="text-gray-400">
                  Gerencie e monitore suas apps criadas
                </CardDescription>
              </div>
              <Link href="/editor">
                <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova App
                </Button>
              </Link>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Pesquisar apps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-purple-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  Todas
                </Button>
                <Button
                  variant={filterStatus === 'published' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('published')}
                  className={filterStatus === 'published' ? 'bg-purple-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  Publicadas
                </Button>
                <Button
                  variant={filterStatus === 'draft' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('draft')}
                  className={filterStatus === 'draft' ? 'bg-purple-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  Rascunhos
                </Button>
              </div>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <Card key={app.id} className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-1">{app.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">
                          {app.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        className={`${
                          app.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {app.status === 'published' ? 'Publicada' : 'Rascunho'}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {app.views} views
                      </span>
                    </div>
                    
                    {app.published && (
                      <div className="mb-4 p-2 bg-gray-700/50 rounded text-sm">
                        <span className="text-gray-400">URL: </span>
                        <span className="text-purple-300">{app.subdomain}.kportugal.ai</span>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Link href={`/editor?id=${app.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-gray-600 text-gray-300 hover:bg-gray-600/10">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                      
                      {app.published && (
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-600/10">
                          <Globe className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredApps.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Nenhuma app encontrada</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm ? 'Tente ajustar sua pesquisa' : 'Comece criando sua primeira aplicação'}
                </p>
                <Link href="/editor">
                  <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Nova App
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}