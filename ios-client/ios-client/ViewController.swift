//
//  ViewController.swift
//  ios-client
//
//  Created by Peach, Daniel on 10/15/19.
//  Copyright © 2019 Peach, Daniel. All rights reserved.
//

import UIKit
import Apollo

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .blue
        
        let getAllUsers = GetAllUsersQuery()
        apollo.fetch(query: getAllUsers) { result in
            print(result)
        }
        
    }


}
