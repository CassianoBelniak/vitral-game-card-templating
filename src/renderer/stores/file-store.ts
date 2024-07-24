import { reactive } from 'vue'
import path from 'path'

export const fileStore = reactive({
    workingDirectory: '',
    projectName: '',
    setProject(projectPath: string) {
        this.workingDirectory = path.dirname(projectPath)
        this.projectName = path.basename(projectPath)
    },
})
