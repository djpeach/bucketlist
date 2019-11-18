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
            do {
                try result.get().data?.getAllUsers?.forEach({ (res) in
                    if let email = res?.email {
                        print(email)
                    }
                })
            } catch let apolloError {
                print(apolloError.localizedDescription)
            }
        }
        
    }


}

