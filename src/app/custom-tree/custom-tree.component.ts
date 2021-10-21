import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-tree',
  templateUrl: './custom-tree.component.html',
  styleUrls: ['./custom-tree.component.scss'],
})
export class CustomTreeComponent implements OnInit {
  constructor() {}
  data: Array<any> = new Array<any>();
  jsonData: myJson = new myJson();
  // @Input() dataObservable: Observable<any> = new Observable<any>();
  @Input() file: File = new File([], '', {});
  ngOnInit(): void {
    // this.dataObservable.subscribe((x) => {
    //   this.rawData = x;
    //   for (var i in x) {
    //     x[i]['elementID'] = i;
    //     this.data.push(x[i]);
    //   }
    //   console.log(this.data);
    // });
    this.readFile();
  }
  scenarios: Array<any> = new Array();
  readFile() {
    let fileReader = new FileReader();
    var $rawData = [{}];
    fileReader.onload = (e) => {
      var bs = fileReader.result as string;
      var x = JSON.parse(bs);
      this.parseJsonData(x);
    };
    fileReader.readAsText(this.file);
  }
  parseJsonData(x: any) {
    this.jsonData = <myJson>x;
    this.assembleScenarios();

    // for (var i in x) {
    //   x[i]['elementID'] = i;

    //   this.data.push(x[i]);
    // }
  }
  transformRules() {
    var rules = this.jsonData.assertRules;
    this.jsonData.assertRules = new Array<assertRules>();
    rules.forEach((x) => {
      this.jsonData.assertRules.push(
        {
          elementID: x.name,
          name: 'name:' + x.name,
        },
        {
          elementID: x.name,
          name: 'equal:' + x.equal,
        }
      );
    });
  }
  transformCommands() {
    var commands = this.jsonData.commands;
    this.jsonData.commands = new Array<commands>();
    commands.forEach((x) => {
      this.jsonData.commands.push(
        {
          elementID: x.name,
          name: 'name:' + x.name,
        },
        {
          elementID: x.name,
          name: 'method:' + x.method,
        }
      );
    });
  }
  transformNodeCommand() {
    var commands = this.jsonData.nodeCommands;
    this.jsonData.nodeCommands = new Array<nodeCommands>();
    commands.forEach((x) => {
      this.jsonData.nodeCommands.push(
        {
          elementID: x.name,
          name: 'name:' + x.name,
        },
        {
          elementID: x.name,
          name: 'path:' + x.path,
        },
        {
          elementID: x.name,
          name: 'command',
          children: this.jsonData.commands.filter(
            (a) => a.elementID == x.command
          ),
        }
      );
    });
  }
  transformNodeAssert() {
    var assert = this.jsonData.nodeAsserts;
    this.jsonData.nodeAsserts = new Array<nodeAsserts>();
    assert.forEach((x) => {
      this.jsonData.nodeAsserts.push(
        {
          elementID: x.name,
          name: 'name:' + x.name,
        },
        {
          elementID: x.name,
          name: 'path:' + x.path,
        },
        {
          elementID: x.name,
          name: 'rule',
          children: this.jsonData.assertRules.filter(
            (a) => a.elementID == x.rule
          ),
        }
      );
    });
  }
  transformExecSteps() {
    var steps = this.jsonData.executionSteps;
    this.jsonData.executionSteps = new Array<executionSteps>();
    steps.forEach((x) => {
      this.jsonData.executionSteps.push(
        {
          elementID: x.name,
          name: 'name:' + x.name,
        },
        {
          elementID: x.name,
          name: 'nodeCommand',
          children: this.jsonData.nodeCommands.filter(
            (a) => a.elementID == x.nodeCommand
          ),
        },
        {
          elementID: x.name,
          name: 'nodeAssert',
          children: this.jsonData.nodeAsserts.filter(
            (a) => a.elementID == x.nodeAssert
          ),
        }
      );
    });
  }
  transformDevices() {
    var devicess = this.jsonData.devices;
    this.jsonData.devices = new Array<devices>();
    devicess.forEach((x) => {
      this.jsonData.devices.push({
        elementID: x.name,
        name: 'name:' + x.name,
      });
      this.jsonData.devices.push({
        elementID: x.name,
        name: 'url:' + x.url,
      });
    });
  }
  transformScenarios() {
    var newData = new Array<any>();
    this.jsonData.scenarios.forEach((x) => {
      newData = new Array<any>();
      var steps = x.steps;
      x.steps = new Array<any>();
      steps.forEach((s) => {
        x.steps.push(
          {
            name: 'device',
            children: this.jsonData.devices.filter(
              (a) => a.elementID == s.device
            ),
          },
          {
            name: 'step',
            children: this.jsonData.executionSteps.filter(
              (a) => a.elementID == s.step
            ),
          }
        );
      });
      newData.push({ name: 'name:' + x.name });
      newData.push({ name: 'steps', children: x.steps });
      newData.push({ name: 'timeout:' + x.timeout });
      this.data.push({ elementID: 'scenarios', children: newData });
    });
  }
  assembleScenarios() {
    this.transformRules();
    this.transformCommands();
    this.transformNodeCommand();
    this.transformNodeAssert();
    this.transformDevices();
    this.transformExecSteps();
    this.transformScenarios();
  }

  expandCollapse(elem: any) {
    var element = elem as HTMLElement;

    var children = element.getElementsByClassName('children');
    if (children.length > 0) {
      element.classList.toggle('expanded');
      children[0].classList.toggle('show');
    }
  }
  getIcon(elem: any) {
    var element = elem as HTMLElement;
    return element.classList.contains('expanded')
      ? 'keyboard_arrow_up'
      : 'keyboard_arrow_down';
  }
  findElementByID(elementID: string) {
    console.log(this.data.find((x) => x.elementID == elementID));
    return [this.data.find((x) => x.elementID == elementID)];
  }
  log(x: any) {
    console.log(x);
  }
}

export class TreeView {
  public elementID: string = '';
  public children?: Array<any> = new Array<any>();
}
export class myJson {
  public devices: Array<devices> = new Array<devices>();
  public commands: Array<commands> = new Array<commands>();
  public nodeCommands: Array<nodeCommands> = new Array<nodeCommands>();
  public assertRules: Array<assertRules> = new Array<assertRules>();
  public nodeAsserts: Array<nodeAsserts> = new Array<nodeAsserts>();
  public executionSteps: Array<executionSteps> = new Array<executionSteps>();
  public scenarios: Array<scenarios> = new Array<scenarios>();
}
export class devices extends TreeView {
  public name: string = '';
  public url?: string = '';
}
export class commands extends TreeView {
  public name: string = '';
  public method?: string = '';
}
export class nodeCommands extends TreeView {
  public name: string = '';
  public path?: string = '';
  public command?: string = '';
}

export class assertRules extends TreeView {
  public name: string = '';
  public equal?: string = '';
}
export class nodeAsserts extends TreeView {
  public name: string = '';
  public path?: string = '';
  public rule?: string = '';
}
export class executionSteps extends TreeView {
  public name: string = '';
  public nodeCommand?: string = '';
  public nodeAssert?: string = '';
}
export class scenarios extends TreeView {
  public name: string = '';
  public timeout?: number = 0;
  public steps: Array<any> = new Array<any>();
}
export class steps extends TreeView {
  public device: string = '';
  public step: string = '';
}
