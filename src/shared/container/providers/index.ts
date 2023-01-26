import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJS } from "./DateProvider/implementations/DayJS";

container.registerSingleton<IDateProvider>("DateProvider", DayJS);
