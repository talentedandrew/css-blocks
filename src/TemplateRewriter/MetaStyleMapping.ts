import * as debugGenerator from "debug";

import { StyledTemplateMapping } from "./StyledTemplateMapping";
import { MetaTemplateAnalysis } from "../TemplateAnalysis/MetaAnalysis";
import { TemplateTypes } from "@opticss/template-api";
import { OptionsReader } from "../OptionsReader";

let debug = debugGenerator("css-blocks");

export class MetaStyleMapping {
  templates: Map<string, StyledTemplateMapping<keyof TemplateTypes>>;
  constructor() {
    this.templates = new Map();
  }
  static fromMetaAnalysis(
    analysis: MetaTemplateAnalysis,
    options: OptionsReader
  ): MetaStyleMapping {
    debug("Creating MetaStyleMapping from MetaAnalysis");
    let metaMapping = new MetaStyleMapping();
    analysis.eachAnalysis(a => {
      debug(`Creating mapping for ${a.template.identifier}`);
      let mapping = StyledTemplateMapping.fromAnalysis<keyof TemplateTypes>(a, options);
      metaMapping.templates.set(a.template.identifier, mapping);
    });
    return metaMapping;
  }
}
