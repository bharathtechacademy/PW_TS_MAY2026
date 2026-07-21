import { exec } from "child_process";
import { stderr, stdout } from "process";

export class JMeterCommons {

    //Common method to run any command from command line 
    runCommand(command: string): Promise<string> {
        return new Promise((resolve, reject) => {

            //Code to run commands from command line. 
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error : ${error.message}`)
                } else {
                    resolve(stdout);
                }
                console.log(`Command executed :  " ${command} " Successfully`)
            })

        });
    }

    //Common Method to Run JMETER Test Plan 
    async runJMeterTestPlan(jmxFilePath: string): Promise<void> {

        console.log("Execution Started for JMeter Test Plan : " + jmxFilePath);

        //Update the relative path of the JMeter folder structure. 
        const projectRoot = process.cwd(); //playwright-tdd-framework
        const jmeterBasePath = `${projectRoot}/tests/load/jmeter`;
        const jmeterToolPath = `${projectRoot}/tests/load/jmeter/bin/jmeter.bat`;
        const testPlanPath = `${jmeterBasePath}/testplans/${jmxFilePath}`;

    };

}