//YAML File Configuration

// trigger refers Branch that needs to be triggered by using this pipeline 
// trigger:
// - master

// pool refers to the agent pool that will be used to run the pipeline
// pool:
//   vmImage: windows-latest


//steps refers to the steps that will be executed in the pipeline

// steps:
// - task: NodeTool@0
//   inputs:
//     versionSpec: '20.x'
//   displayName: 'Install Node.js'

// - script: |
//     npm install
//     npm run build
//   displayName: 'npm install and build'
