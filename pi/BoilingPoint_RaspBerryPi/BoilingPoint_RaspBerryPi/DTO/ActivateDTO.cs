using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoilingPoint_RaspBerryPi.DTO
{
    class ActivateDTO : IKettleDTO
    {
        public int Type { get; set; }
        public bool Activate { get; set; }
    }
}
