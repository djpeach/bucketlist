//
//  RootTabBarController.swift
//  MyHome
//
//  Created by Daniel Peach on 10/6/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class RootTabBarController: UITabBarController, UITabBarControllerDelegate {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        delegate = self
        
        let dummy = ViewController()
        
        viewControllers = [dummy]
        
        guard let items = tabBar.items else { return }
        
        for item in items {
            item.imageInsets = UIEdgeInsets(top: 8, left: 0, bottom: -8, right: 0)
        }
    }
}
