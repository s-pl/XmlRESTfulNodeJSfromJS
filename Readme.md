# NodeJS RESTFul XML accessing from JS Example

It's just that: an API and a client which send/receive XML data. 

It's quite rare nowadays because in most cases you just send/receive JSON data instead of XML.

In the "api" directory you will find the API made with NodeJS, xmldom, xsd-schema-validator and express-xml-bodyparser.

In the "web" directory you will find the client, just pure HTML, CSS and JavaScript, using AJAX.

This example is nothing special. The client can:
* Create new monuments with some inputs like Name, Addres..
* Show all listed monuments.

### IMPORTANT:

This project uses the package express-xml-bodyparser which needs JAVA. You can find the details in https://www.npmjs.com/package/xsd-schema-validator

This project was tested with JDK 1.8.0_202. To check your installed JDK version you can use the following command:

```
echo $JAVA_HOME
C:\Program Files\Java\jdk1.8.0_202
```

### Screenshots

* Creating a product:

![create product](https://github.com/s-pl/XmlRESTfulNodeJSfromJS/blob/main/web/img/create_monument.png)

* Showing all products:

![show products](https://github.com/s-pl/XmlRESTfulNodeJSfromJS/blob/main/web/img/show_monument.png)

### Prerequisites

Before starting you need some background on NodeJS and JavaScript. Check the links bellow.

To install this project you need a working NodeJS environment. Again see the links bellow...

### Installing

Open a command line console and clone this project.

```
git clone https://github.com/s-pl/XmlRESTfulNodeJSfromJS
```

Go to the new created directory

```
cd XmlRESTfulNodeJSfromJS
```

Go to the api directory

```
cd api
```

Install all dependencies

```
npm install
```

Boot your API

```
node index.js
```

Test the project with a browser

```
open your favourite browser with the file XmlRESTfulNodeJSfromJS/web/index.html
```

### XML and XSD files 

An example of XML file sent from client to web service to create a new product:

```
<?xml version="1.0" encoding="UTF-8"?>
<Monuments>
  <Monument>
    <Name>Eiffel Tower</Name>
    <Address>Champ de Mars, 5 Avenue Anatole</Address>
    <Description>The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.</Description>
    <Coordinates>
      <Latitude>48.8584</Latitude>
      <Longitude>2.2945</Longitude>
    </Coordinates>
  </Monument>
</Monuments>

```

An example of XML file stored in the Server:

```
<?xml version="1.0" encoding="UTF-8"?>
<Monuments>
  <Monument>
    <Name>Eiffel Tower</Name>
    <Address>Champ de Mars, 5 Avenue Anatole</Address>
    <Description>The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.</Description>
    <Coordinates>
      <Latitude>48.8584</Latitude>
      <Longitude>2.2945</Longitude>
    </Coordinates>
  </Monument>
   <Monument>
    <Name>Statue of Liberty</Name>
    <Address>New York, NY 10004, United States</Address>
    <Description>A colossal neoclassical sculpture on Liberty Island in New York Harbor.</Description>
    <Coordinates>
      <Latitude>40.6892</Latitude>
      <Longitude>-74.0445</Longitude>
    </Coordinates>
  </Monument>
</Monuments>

```

XSD file in Server:

```
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Monuments">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Monument" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="Name" type="xs:string"/>
              <xs:element name="Address" type="xs:string"/>
              <xs:element name="Description" type="xs:string" minOccurs="0"/>
              <xs:element name="Coordinates" minOccurs="0">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element name="Latitude" type="xs:decimal"/>
                    <xs:element name="Longitude" type="xs:decimal"/>
                  </xs:sequence>
                </xs:complexType>
              </xs:element>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>

```

# Validation screenshots

A validation test offline made with Netbeans IDE. 

![validation test](https://github.com/s-pl/XmlRESTfulNodeJSfromJS/blob/main/web/img/monument_validation.png)



## Built With

* [NodeJS](https://nodejs.org/es/) - Node.js un entorno de ejecución para JavaScript
* [xmldom](https://github.com/jindw/xmldom) - A JavaScript implementation of W3C DOM for Node.js.
* [xsd-schema-validator](https://www.npmjs.com/package/xsd-schema-validator) - Allows XML validation with an XML Schema.
* [express-xml-bodyparser](https://github.com/remind101/express-xml-bodyparser) - For those rare cases when you have to parse incoming raw xml-body requests. This middleware works with any connect- or express-based nodejs application.
* [AJAX](https://www.w3schools.com/js/js_ajax_intro.asp) - Allows an HTML client to read, update, create and detele data from a web service.


## Acknowledgments

* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md. A very good Readme.md template.
* https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript. How to Connect to an API with JavaScript.
* https://www.w3schools.com/xml/dom_intro.asp. Understanding the DOM is a must for anyone working with HTML or XML. You can learn a lot with this tutorial.
* https://github.com/tcrurav My very dear professor.
