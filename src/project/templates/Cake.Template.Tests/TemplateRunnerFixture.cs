namespace Cake.<%= projectName %>.Tests
{
    using Cake.Testing.Fixtures;

    public class <%= projectName %>RunnerFixture : ToolFixture<<%= projectName %>Settings>
    {
        public <%= projectName %>RunnerFixture()
            : base("<%= projectName %>.exe")
        {
        }

        protected override void RunTool()
        {
            var tool = new <%= projectName %>Runner(FileSystem, Environment, ProcessRunner, Tools);
            tool.Run(Settings);
        }
    }
}
