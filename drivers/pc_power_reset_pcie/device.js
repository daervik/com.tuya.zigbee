'use strict';

const Homey = require('homey');
const { ZigBeeDevice } = require('homey-zigbeedriver');
const { debug, CLUSTER } = require('zigbee-clusters');

class pc_power_reset_pcie extends ZigBeeDevice {

    async onNodeInit({zclNode}) {

        this.printNode();
		
        debug(true);

        await zclNode.endpoints[1].clusters.basic.readAttributes('manufacturerName', 'zclVersion', 'appVersion', 'modelId', 'powerSource', 'attributeReportingStatus')
        .catch(err => {
            this.error('Error when reading device attributes ', err);
        });

        this.registerCapability('onoff', CLUSTER.ON_OFF);

    }

    onDeleted(){
		this.log("PC Power/Reset PCIe Card removed")
	}

}

module.exports = pc_power_reset_pcie;