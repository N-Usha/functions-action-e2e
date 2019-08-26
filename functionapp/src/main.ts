import { Orchestrator } from './manager/orchestrator';
import { StateConstant } from './constants/state';
import { InitializeHandler } from './handlers/initialize';


function main(): void {
    const actionManager = new Orchestrator();
    actionManager.register(StateConstant.Initialize, new InitializeHandler());
    actionManager.execute();
}

main();