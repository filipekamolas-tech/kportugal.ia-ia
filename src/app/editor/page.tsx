'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles,
  Save,
  Play,
  Smartphone,
  Monitor,
  Tablet,
  Undo,
  Redo,
  Type,
  Square,
  Image,
  MessageCircle,
  BarChart3,
  MousePointer,
  Trash2,
  Settings,
  Eye,
  Code,
  Palette,
  Layout
} from 'lucide-react'
import Link from 'next/link'

interface Component {
  id: string
  type: 'text' | 'button' | 'form' | 'image' | 'chatbot' | 'dashboard' | 'input'
  position: { x: number; y: number }
  size: { width: number; height: number }
  props: Record<string, any>
}

interface AppConfig {
  name: string
  description: string
  components: Component[]
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
  }
}

export default function EditorPage() {
  const [appConfig, setAppConfig] = useState<AppConfig>({
    name: 'Nova Aplicação',
    description: 'Descrição da aplicação',
    components: [],
    theme: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#F59E0B', 
      backgroundColor: '#1F2937'
    }
  })

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showCode, setShowCode] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const componentTypes = [
    { type: 'text', icon: <Type className="w-4 h-4" />, label: 'Texto' },
    { type: 'button', icon: <Square className="w-4 h-4" />, label: 'Botão' },
    { type: 'input', icon: <Square className="w-4 h-4" />, label: 'Input' },
    { type: 'form', icon: <Square className="w-4 h-4" />, label: 'Formulário' },
    { type: 'image', icon: <Image className="w-4 h-4" />, label: 'Imagem' },
    { type: 'chatbot', icon: <MessageCircle className="w-4 h-4" />, label: 'Chatbot' },
    { type: 'dashboard', icon: <BarChart3 className="w-4 h-4" />, label: 'Dashboard' }
  ]

  const addComponent = (type: Component['type']) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      size: { width: 200, height: type === 'text' ? 40 : type === 'button' ? 50 : 100 },
      props: getDefaultProps(type)
    }

    setAppConfig(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }))
  }

  const getDefaultProps = (type: Component['type']) => {
    switch (type) {
      case 'text':
        return { content: 'Texto de exemplo', fontSize: 16, color: '#FFFFFF' }
      case 'button':
        return { text: 'Botão', backgroundColor: '#8B5CF6', textColor: '#FFFFFF' }
      case 'input':
        return { placeholder: 'Digite aqui...', label: 'Campo' }
      case 'form':
        return { title: 'Formulário', fields: ['Nome', 'Email'] }
      case 'image':
        return { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop', alt: 'Imagem' }
      case 'chatbot':
        return { title: 'Chatbot', welcomeMessage: 'Olá! Como posso ajudar?' }
      case 'dashboard':
        return { title: 'Dashboard', widgets: ['Gráfico', 'Métricas'] }
      default:
        return {}
    }
  }

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setAppConfig(prev => ({
      ...prev,
      components: prev.components.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      )
    }))
  }

  const deleteComponent = (id: string) => {
    setAppConfig(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id)
    }))
    setSelectedComponent(null)
  }

  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    e.preventDefault()
    setSelectedComponent(componentId)
    setIsDragging(true)
    
    const component = appConfig.components.find(c => c.id === componentId)
    if (component) {
      setDragOffset({
        x: e.clientX - component.position.x,
        y: e.clientY - component.position.y
      })
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && selectedComponent) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      
      updateComponent(selectedComponent, {
        position: { x: Math.max(0, newX), y: Math.max(0, newY) }
      })
    }
  }, [isDragging, selectedComponent, dragOffset])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Event listeners para drag
  useEffect(() => {
    if (typeof document === "undefined") return; // Evita SSR
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const renderComponent = (component: Component) => {
    const style = {
      position: 'absolute' as const,
      left: component.position.x,
      top: component.position.y,
      width: component.size.width,
      height: component.size.height,
      cursor: 'move',
      border: selectedComponent === component.id ? '2px solid #8B5CF6' : '1px solid transparent',
      borderRadius: '4px'
    }

    switch (component.type) {
      case 'text':
        return (
          <div
            key={component.id}
            style={style}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            className="flex items-center justify-center bg-transparent"
          >
            <span style={{ 
              fontSize: component.props.fontSize, 
              color: component.props.color 
            }}>
              {component.props.content}
            </span>
          </div>
        )
      
      case 'button':
        return (
          <div
            key={component.id}
            style={style}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            className="flex items-center justify-center"
          >
            <button
              style={{
                backgroundColor: component.props.backgroundColor,
                color: component.props.textColor,
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {component.props.text}
            </button>
          </div>
        )
      
      case 'input':
        return (
          <div
            key={component.id}
            style={style}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            className="p-2"
          >
            <label className="block text-sm text-gray-300 mb-1">
              {component.props.label}
            </label>
            <input
              type="text"
              placeholder={component.props.placeholder}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
              readOnly
            />
          </div>
        )
      
      case 'image':
        return (
          <div
            key={component.id}
            style={style}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            className="overflow-hidden rounded"
          >
            <img
              src={component.props.src}
              alt={component.props.alt}
              className="w-full h-full object-cover"
            />
          </div>
        )
      
      case 'chatbot':
        return (
          <div
            key={component.id}
            style={style}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            className="bg-gray-800 border border-gray-600 rounded-lg p-4"
          >
            <h3 className="text-white font-semibold mb-2">{component.props.title}</h3>
            <div className="bg-gray-700 rounded p-2 text-sm text-gray-300">
              {component.props.welcomeMessage}
            </div>
          </div>
        )
      
      case 'dashboard':
        return (
          <div
            key={component.id}
            style={style}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            className="bg-gray-800 border border-gray-600 rounded-lg p-4"
          >
            <h3 className="text-white font-semibold mb-2">{component.props.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {component.props.widgets.map((widget: string, index: number) => (
                <div key={index} className="bg-gray-700 rounded p-2 text-xs text-gray-300">
                  {widget}
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const getCanvasSize = () => {
    switch (viewMode) {
      case 'mobile': return { width: 375, height: 667 }
      case 'tablet': return { width: 768, height: 1024 }
      default: return { width: 1200, height: 800 }
    }
  }

  const selectedComponentData = selectedComponent 
    ? appConfig.components.find(c => c.id === selectedComponent)
    : null

  const generateCode = () => {
    return `// Código gerado automaticamente
export default function GeneratedApp() {
  return (
    <div style={{ backgroundColor: '${appConfig.theme.backgroundColor}' }}>
      ${appConfig.components.map(comp => {
        switch (comp.type) {
          case 'text':
            return `<div style={{ position: 'absolute', left: ${comp.position.x}, top: ${comp.position.y} }}>
        <span style={{ fontSize: ${comp.props.fontSize}, color: '${comp.props.color}' }}>
          ${comp.props.content}
        </span>
      </div>`
          case 'button':
            return `<button style={{ 
        position: 'absolute', 
        left: ${comp.position.x}, 
        top: ${comp.position.y},
        backgroundColor: '${comp.props.backgroundColor}',
        color: '${comp.props.textColor}'
      }}>
        ${comp.props.text}
      </button>`
          default:
            return `<!-- ${comp.type} component -->`
        }
      }).join('\n      ')}
    </div>
  )
}`
  }

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
            
            <div className="flex items-center space-x-4">
              <Input
                value={appConfig.name}
                onChange={(e) => setAppConfig(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white w-48"
              />
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-300">
                  <Undo className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300">
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className={viewMode === 'desktop' ? 'bg-purple-600 text-white' : 'text-gray-300'}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className={viewMode === 'tablet' ? 'bg-purple-600 text-white' : 'text-gray-300'}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className={viewMode === 'mobile' ? 'bg-purple-600 text-white' : 'text-gray-300'}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" className="text-gray-300" onClick={() => setShowCode(!showCode)}>
                <Code className="w-4 h-4" />
              </Button>
              
              <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Components */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-800 p-4">
          <h3 className="text-white font-semibold mb-4">Componentes</h3>
          
          <div className="space-y-2 mb-6">
            {componentTypes.map((comp) => (
              <Button
                key={comp.type}
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => addComponent(comp.type as Component['type'])}
              >
                {comp.icon}
                <span className="ml-2">{comp.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-white font-medium mb-3">Tema</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-gray-300 text-sm">Cor Primária</Label>
                <Input
                  type="color"
                  value={appConfig.theme.primaryColor}
                  onChange={(e) => setAppConfig(prev => ({
                    ...prev,
                    theme: { ...prev.theme, primaryColor: e.target.value }
                  }))}
                  className="w-full h-8 bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm">Cor Secundária</Label>
                <Input
                  type="color"
                  value={appConfig.theme.secondaryColor}
                  onChange={(e) => setAppConfig(prev => ({
                    ...prev,
                    theme: { ...prev.theme, secondaryColor: e.target.value }
                  }))}
                  className="w-full h-8 bg-gray-800 border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-800 p-8 overflow-auto">
          <div className="flex justify-center">
            <div
              ref={canvasRef}
              className="bg-gray-900 border border-gray-700 rounded-lg relative overflow-hidden"
              style={{
                width: getCanvasSize().width,
                height: getCanvasSize().height,
                backgroundColor: appConfig.theme.backgroundColor
              }}
            >
              {appConfig.components.map(renderComponent)}
              
              {appConfig.components.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Layout className="w-12 h-12 mx-auto mb-4" />
                    <p>Arraste componentes aqui para começar</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-gray-900/50 border-l border-gray-800 p-4">
          {selectedComponentData ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Propriedades</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteComponent(selectedComponentData.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-sm">Tipo</Label>
                  <Badge className="ml-2 bg-purple-600/20 text-purple-300">
                    {selectedComponentData.type}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-gray-300 text-sm">X</Label>
                    <Input
                      type="number"
                      value={selectedComponentData.position.x}
                      onChange={(e) => updateComponent(selectedComponentData.id, {
                        position: { ...selectedComponentData.position, x: parseInt(e.target.value) || 0 }
                      })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Y</Label>
                    <Input
                      type="number"
                      value={selectedComponentData.position.y}
                      onChange={(e) => updateComponent(selectedComponentData.id, {
                        position: { ...selectedComponentData.position, y: parseInt(e.target.value) || 0 }
                      })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-gray-300 text-sm">Largura</Label>
                    <Input
                      type="number"
                      value={selectedComponentData.size.width}
                      onChange={(e) => updateComponent(selectedComponentData.id, {
                        size: { ...selectedComponentData.size, width: parseInt(e.target.value) || 0 }
                      })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Altura</Label>
                    <Input
                      type="number"
                      value={selectedComponentData.size.height}
                      onChange={(e) => updateComponent(selectedComponentData.id, {
                        size: { ...selectedComponentData.size, height: parseInt(e.target.value) || 0 }
                      })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                {/* Component-specific properties */}
                {selectedComponentData.type === 'text' && (
                  <>
                    <div>
                      <Label className="text-gray-300 text-sm">Conteúdo</Label>
                      <Textarea
                        value={selectedComponentData.props.content}
                        onChange={(e) => updateComponent(selectedComponentData.id, {
                          props: { ...selectedComponentData.props, content: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm">Tamanho da Fonte</Label>
                      <Input
                        type="number"
                        value={selectedComponentData.props.fontSize}
                        onChange={(e) => updateComponent(selectedComponentData.id, {
                          props: { ...selectedComponentData.props, fontSize: parseInt(e.target.value) || 16 }
                        })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm">Cor</Label>
                      <Input
                        type="color"
                        value={selectedComponentData.props.color}
                        onChange={(e) => updateComponent(selectedComponentData.id, {
                          props: { ...selectedComponentData.props, color: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </>
                )}
                
                {selectedComponentData.type === 'button' && (
                  <>
                    <div>
                      <Label className="text-gray-300 text-sm">Texto</Label>
                      <Input
                        value={selectedComponentData.props.text}
                        onChange={(e) => updateComponent(selectedComponentData.id, {
                          props: { ...selectedComponentData.props, text: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm">Cor de Fundo</Label>
                      <Input
                        type="color"
                        value={selectedComponentData.props.backgroundColor}
                        onChange={(e) => updateComponent(selectedComponentData.id, {
                          props: { ...selectedComponentData.props, backgroundColor: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <Settings className="w-12 h-12 mx-auto mb-4" />
              <p>Selecione um componente para editar suas propriedades</p>
            </div>
          )}
          
          {showCode && (
            <div className="mt-8 border-t border-gray-800 pt-4">
              <h4 className="text-white font-medium mb-3">Código Gerado</h4>
              <pre className="bg-gray-800 p-3 rounded text-xs text-gray-300 overflow-auto max-h-40">
                {generateCode()}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}