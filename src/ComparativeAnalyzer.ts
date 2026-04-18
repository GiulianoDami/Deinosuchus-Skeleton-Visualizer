import * as THREE from 'three';

export class ComparativeAnalyzer {
  private deinosuchusData: any;
  private modernCrocsData: any;

  constructor() {
    this.deinosuchusData = {
      length: 9.4, // meters
      weight: 1500, // kg
      skullLength: 1.8, // meters
      jawLength: 1.2, // meters
      height: 2.5 // meters
    };

    this.modernCrocsData = {
      saltwaterCrocodile: {
        length: 5.5, // meters
        weight: 1000, // kg
        skullLength: 0.7, // meters
        jawLength: 0.5, // meters
        height: 1.5 // meters
      },
      americanAlligator: {
        length: 4.0, // meters
        weight: 400, // kg
        skullLength: 0.5, // meters
        jawLength: 0.3, // meters
        height: 1.0 // meters
      }
    };
  }

  getDeinosuchusData(): any {
    return this.deinosuchusData;
  }

  getModernCrocsData(): any {
    return this.modernCrocsData;
  }

  compareByLength(): any {
    const ratios = {};
    Object.keys(this.modernCrocsData).forEach(croc => {
      ratios[croc] = this.deinosuchusData.length / this.modernCrocsData[croc].length;
    });
    return ratios;
  }

  compareByWeight(): any {
    const ratios = {};
    Object.keys(this.modernCrocsData).forEach(croc => {
      ratios[croc] = this.deinosuchusData.weight / this.modernCrocsData[croc].weight;
    });
    return ratios;
  }

  compareSkullProportions(): any {
    const ratios = {};
    Object.keys(this.modernCrocsData).forEach(croc => {
      ratios[croc] = this.deinosuchusData.skullLength / this.modernCrocsData[croc].skullLength;
    });
    return ratios;
  }

  generateComparisonReport(): string {
    const lengthRatios = this.compareByLength();
    const weightRatios = this.compareByWeight();
    const skullRatios = this.compareSkullProportions();

    let report = "Comparative Analysis Report\n";
    report += "==========================\n\n";
    report += `Deinosuchus Schwimeri:\n`;
    report += `- Length: ${this.deinosuchusData.length} meters\n`;
    report += `- Weight: ${this.deinosuchusData.weight} kg\n`;
    report += `- Skull Length: ${this.deinosuchusData.skullLength} meters\n\n`;

    Object.keys(this.modernCrocsData).forEach(croc => {
      report += `${croc.replace(/([A-Z])/g, ' $1').trim()}:\n`;
      report += `- Length: ${this.modernCrocsData[croc].length} meters\n`;
      report += `- Weight: ${this.modernCrocsData[croc].weight} kg\n`;
      report += `- Skull Length: ${this.modernCrocsData[croc].skullLength} meters\n`;
      report += `- Size Ratio (Deino/Saltwater): ${lengthRatios[croc].toFixed(2)}x\n`;
      report += `- Weight Ratio (Deino/Saltwater): ${weightRatios[croc].toFixed(2)}x\n`;
      report += `- Skull Ratio (Deino/Saltwater): ${skullRatios[croc].toFixed(2)}x\n\n`;
    });

    return report;
  }
}