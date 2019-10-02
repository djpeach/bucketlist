//
//  RootTabBarController.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class RootTabBarController: UITabBarController, UITabBarControllerDelegate {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        delegate = self
        loadSubVCs()
    }
    
    private func loadSubVCs() {
        let listVC = ListManagerVC()
        let newVC = NewSuggestionVC()
        let moreVC = MoreTabVC()
        
        viewControllers = [listVC, newVC, moreVC]
    }
}
