// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CWNFT is ERC721 {
    address padre;

    constructor(address _padre) ERC721("Cherno Watch", "CW") {
        padre = _padre;
    }

    // Definimos el Struct que representará un reloj
    struct Reloj {
        uint256 _SerieNumber;
        string dateCreation;
        string[] _components;
        string _fabricationPlace;
        address current_owner;
        string image;
        string video;
    }
    // Declaramos un reloj
    Reloj public watch;
    // Definimos el array de propietarios
    address[] public Allowners;

    // Definimos un modificador, para asegurar que esta funcion es ejecutada desde del padre
    modifier onlyFather() {
        require(msg.sender == padre, "You Can't execute this function");
        _;
    }

      event NewSold(
        address indexed employer,
        address indexed dest,
        uint256 watch_id
    );
    function getPadre() public view returns(address){
        return padre;
    }

    // Definimos la función crear reloj, la cual únicamente puede ser ejecutada desde
    // el contrato padre
    function createWatch(
        uint256 _serie,
        string memory _dateCreation,
        string[] memory _components,
        string memory _fp,
        address _newOwner,
        string memory _image,
        string memory _video
    ) external  onlyFather {
        Allowners.push(_newOwner);
        Reloj memory reloj = Reloj(
            _serie,
            _dateCreation,
            _components,
            _fp,
            _newOwner,
            _image,
            _video
        );
        watch= reloj;
        _safeMint(_newOwner, _serie);
    }

    //Definimos modificador para saber si el reloj actual únicamente tienen un propietario
    modifier onlyfirstSell {
        require(
            Allowners.length == 1,
            "You can't execute this,function, you don't are the first owner"
        );
        _;
    }
     modifier onlyclient {
        require(
            Allowners.length > 1,
            "You can't execute this,function, you don't are the first owner"
        );
        _;
    }

    // Definimos la función para transferir el reloj por primera vez, esto es si solo tiene
    // un propietario, la primera vez que se venda un reloj, este solo puede ser vendido desde
    // el contrato padre por la función especificada
    function firstSell(uint256 id, address seller,address newOwner) external onlyFather onlyfirstSell{
        Allowners.push(newOwner);
        safeTransferFrom(watch.current_owner, newOwner, id);
        watch.current_owner = newOwner;
        emit NewSold(seller,newOwner,id);

    }

    // Modificador que hace que unicamente el propietario actual del reloj pueda venderlo
    modifier onlyOwner(uint256 id) {
        require(
            watch.current_owner == msg.sender,
            "You don't are the owner of the Watch"
        );
        _;
    }
    // Definimos una función que permita  al propietariotransferir la propiedad del reloj
    function transfer(uint256 serialNumber, address newOwner) public onlyclient {
        Allowners.push(newOwner);
        safeTransferFrom(watch.current_owner, newOwner, serialNumber);
        watch.current_owner = newOwner;
    }
    function getMaterials()
        public
        view
        returns (string[] memory)
    {
        return watch._components;
    }
    function getOwners()
        public
        view
        returns (address[] memory)
    {
        return Allowners;

    }


}
