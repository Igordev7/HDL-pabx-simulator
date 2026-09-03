export { SimulatedSerialTransport } from './simulated-serial-transport.js';
export { SerialTransport } from './transport.js';
export { SimulatorControlServer, type PainelCallbacks, } from './simulator/control-server.js';
export { CentralSimulator } from './simulator/central-simulator.js';
export { getModeloSimulado, setModeloSimulado, getRespostaEnvio, setRespostaEnvio, getConfigRecebimento, setConfigRecebimento, getCaminhoReplay, setCaminhoReplay, registrarSimuladorAtivo, getSimuladorAtivo, dispararQuedaSimulada, type RespostaEnvio, type ConfigRecebimento, } from './simulator/runtime.js';
