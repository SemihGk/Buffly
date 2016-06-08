//
//  socketUtility.swift
//  Buffly
//
//  Created by Semih Gokceoglu on 2016-05-22.
//  Copyright © 2016 Semih Gokceoglu. All rights reserved.
//

import UIKit
import SocketIOClientSwift

class SocketUtility: NSObject { // might need object c classes
    static let socketUtility = SocketUtility() // make it public variable with static
    
    var socket: SocketIOClient = SocketIOClient(socketURL: NSURL(string: "http://localhost:3000")!) // crete client socket
    
    override init() { // because of nsobject inheritation
        super.init()
    }
    
    func startConnection() {
        socket.connect()
    }
    
    func closeConnection() {
        socket.disconnect()
    }
    
    func sendMessage(message: String) {
        socket.emit("sendMessage", message)
    }
}

