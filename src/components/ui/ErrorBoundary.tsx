import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

// Перехоплює критичні помилки рендерингу компонентів (React Error Boundary)
// і показує запасний екран замість повністю білої, "розбитої" сторінки.
export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-xl font-bold text-ink mb-2">Ой, щось пішло не так</h2>
          <p className="text-muted text-sm mb-4">Сталася непередбачена помилка інтерфейсу.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-bold btn-pop cursor-pointer"
          >
            Оновити сторінку
          </button>
        </div>
      )
    }
    return this.props.children
  }
}