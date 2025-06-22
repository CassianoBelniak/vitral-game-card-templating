import Mexp from 'math-expression-evaluator'

export default function attemptToEvaluate(expression: string) {
    const mexp = new Mexp()
    try {
        return mexp.eval(expression)
    } catch {
        return expression
    }
}
