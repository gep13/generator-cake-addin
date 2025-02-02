namespace Cake.<%= projectName %>
{
    using System;
    using System.Collections.Generic;
    using Cake.Core;
    using Cake.Core.IO;
    using Cake.Core.Tooling;

    public sealed class <%= projectName %>Runner : Tool<<%= projectName %>Settings>
    {
        public <%= projectName %>Runner(
            IFileSystem fileSystem,
            ICakeEnvironment environment,
            IProcessRunner processRunner,
            IToolLocator tools)
            : base(fileSystem, environment, processRunner, tools)
        {
        }

        public void Run(<%= projectName %>Settings settings)
        {
            if (settings == null)
            {
                throw new ArgumentNullException(nameof(settings));
            }

            this.Run(settings, GetArguments(settings));
        }

        protected override IEnumerable<string> GetToolExecutableNames()
        {
            yield return "<%= projectName %>.exe";
            yield return "<%= projectName %>";
        }

        protected override string GetToolName()
        {
            return "<%= projectName %>";
        }

        private static ProcessArgumentBuilder GetArguments(<%= projectName %>Settings settings)
        {
            var builder = new ProcessArgumentBuilder();

            // TODO: Add the necessary arguments based on the settings class

            return builder;
        }
    }
}
