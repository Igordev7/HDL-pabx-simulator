// Logger mínimo para o simulador rodar sem depender do winston/electron do
// CTI2. Mesma superfície (info/debug/warn/error) usada pelos arquivos do
// simulador. Silencioso quando SIM_LOG=0.
const on = process.env.SIM_LOG !== '0';
const ts = () => new Date().toISOString().slice(11, 19);
export const logger = {
    info: (...a) => on && console.log(`[${ts()}][info]`, ...a),
    debug: (...a) => on && console.debug(`[${ts()}][debug]`, ...a),
    warn: (...a) => on && console.warn(`[${ts()}][warn]`, ...a),
    error: (...a) => on && console.error(`[${ts()}][error]`, ...a),
};
//# sourceMappingURL=logger.js.map