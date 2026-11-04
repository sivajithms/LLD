class XmlDataProvider {
    getXmlData(data: string) {
        const values = data.split(':');
        const name = values[0];
        const id = values[1];

        return (
            `<user>
    <name>${name}</name>
    <id>${id}</id>
</user>`
        )
    }
}

abstract class IRequest {
    abstract getJsonData(data: string): JSON;
}


class XmlDataProviderAdapter extends IRequest {
    private xmlDataProvider: XmlDataProvider;

    constructor(xmlDataProvider: XmlDataProvider) {
        super();
        this.xmlDataProvider = xmlDataProvider;
    }

    getJsonData(data: string): JSON {
        const xmlData = this.xmlDataProvider.getXmlData(data);

        const nameStartPos = xmlData.search('<name>') + 6;
        const nameEndPos = xmlData.search('</name>');
        const idStartPos = xmlData.search('<id>') + 4
        const idEndPos = xmlData.search('</id>')

        const name = xmlData.substring(nameStartPos, nameEndPos);
        const id = xmlData.substring(idStartPos, idEndPos);
        

        return {name, id} as unknown as JSON;
    }

}

class Client {
    getReport(request: IRequest, data: string) {
        return request.getJsonData(data)
    }
} 

const adapter = new XmlDataProviderAdapter(new XmlDataProvider());

const data = "John:12345"

const client = new Client();

const jsonData =  client.getReport(adapter, data);

console.log(jsonData);
