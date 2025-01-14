namespace Cake.<%= projectName %>.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using Cake.Core;
    using Cake.Core.IO;
    using Cake.Testing;
    using Cake.Testing.Fixtures;
    using Moq;

    public class <%= projectName %>AliasesFixture : <%= projectName %>RunnerFixture
    {
        internal ICakeContext _context;

        public <%= projectName %>AliasesFixture()
        {
            var argumentsMoq = new Mock<ICakeArguments>();
            var registryMoq = new Mock<IRegistry>();
            var dataService = new Mock<ICakeDataService>();
            _context = new CakeContext(
                FileSystem,
                Environment,
                Globber,
                new FakeLog(),
                argumentsMoq.Object,
                ProcessRunner,
                registryMoq.Object,
                Tools,dataService.Object,
                Configuration);
        }

        protected override void RunTool()
        {
            if (Settings == null)
            {
                <%= projectName %>Aliases.<%= projectName %>(_context);
            }
            else
            {
                <%= projectName %>Aliases.<%= projectName %>(_context, Settings);
            }
        }
    }
}
