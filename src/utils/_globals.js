import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/*.vue', {
      eager: true
    })

    // 將物件轉成陣列
    Object.entries(baseComponents).forEach(([path, module]) => {
      const componentName = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )

      app.component(`Base${componentName}`, module.default)
    })
  }
}
