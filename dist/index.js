// API pública do simulador da central PABX HDL.
//
// Uso no CTI2 (createTransport, caso 'simulator'):
//   const { SimulatedSerialTransport, SimulatorControlServer } =
//     await import('pabx-hdl-simulator');
export { SimulatedSerialTransport } from './simulated-serial-transport.js';
export { SimulatorControlServer, } from './simulator/control-server.js';
export { CentralSimulator } from './simulator/central-simulator.js';
// Estado/runtime do simulador (o painel de controle e o CTI2 leem/escrevem).
export { getModeloSimulado, setModeloSimulado, getRespostaEnvio, setRespostaEnvio, getConfigRecebimento, setConfigRecebimento, getCaminhoReplay, setCaminhoReplay, registrarSimuladorAtivo, getSimuladorAtivo, dispararQuedaSimulada, } from './simulator/runtime.js';
//# sourceMappingURL=index.js.map