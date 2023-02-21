import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayJS } from "./implementations/DayJS";

container.registerSingleton<IDateProvider>("DateProvider", DayJS);
