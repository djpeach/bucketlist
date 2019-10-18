//
//  AuthVC.swift
//  MyHome
//
//  Created by Daniel Peach on 10/6/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit
import Firebase

protocol AuthViewDelegate {
    func switchToRegister()
    func switchToLogin()
    func login(email: String, password: String, cb: @escaping AuthDataResultCallback)
    func register(email: String, password: String, cb: @escaping AuthDataResultCallback)
}

class AuthVC: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        switchToLogin()
    }
}

extension AuthVC: AuthViewDelegate {
    func switchToRegister() {
        let register = Register()
        register.delegate = self
        view = register
    }
    
    func switchToLogin() {
        let login = Login()
        login.delegate = self
        view = login
    }
    
    func login(email: String, password: String, cb: @escaping AuthDataResultCallback) {
        Auth.auth().signIn(withEmail: email, password: password, completion: cb)
    }
    
    func register(email: String, password: String, cb: @escaping AuthDataResultCallback) {
        Auth.auth().createUser(withEmail: email, password: password, completion: cb)
    }
    
    
}
