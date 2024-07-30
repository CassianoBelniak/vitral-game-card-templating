import { reactive } from 'vue'
import path from 'path'

export const projectConfigStore = reactive({
    width: '63mm',
    height: '88mm',
    ppi: 0,
    workingDirectory: '',
    projectName: '',
    setProject(projectPath: string) {
        this.workingDirectory = path.dirname(projectPath)
        this.projectName = path.basename(projectPath)
    },
})
